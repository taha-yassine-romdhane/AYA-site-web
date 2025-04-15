const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Initialize Prisma client with error handling
let prisma = null;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
}

// Middleware
app.use(cors());
app.use(express.json());

// Fallback storage for form submissions when database is unavailable
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'welcome-submissions.json');

// Helper function to save submissions to a JSON file when DB is unavailable
async function saveSubmissionToFile(submission) {
  try {
    // Create directory if it doesn't exist
    const dir = path.dirname(SUBMISSIONS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Read existing submissions or create empty array
    let submissions = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      submissions = JSON.parse(data);
    }
    
    // Create new submission with timestamp
    const newSubmission = {
      ...submission,
      id: `local-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    // Add to array and write back to file
    submissions.push(newSubmission);
    fs.writeFileSync(SUBMISSIONS_FILE, JSON.stringify(submissions, null, 2));
    
    return newSubmission;
  } catch (error) {
    console.error('Error saving submission to file:', error);
    return null;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Products API
app.get('/api/products', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const products = await prisma.product.findMany({
      include: {
        category: true,
      },
    });
    
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

app.get('/api/products/:id', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const product = await prisma.product.findUnique({
      where: {
        id: req.params.id,
      },
      include: {
        category: true,
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    });
    
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    
    res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

app.post('/api/products', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, description, price, images, categoryId, stock } = req.body;
    
    const product = await prisma.product.create({
      data: {
        name,
        description,
        price: parseFloat(price),
        images,
        categoryId,
        stock: parseInt(stock),
      },
    });
    
    res.status(201).json(product);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

app.put('/api/products/:id', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, description, price, images, categoryId, stock } = req.body;
    
    const product = await prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name,
        description,
        price: parseFloat(price),
        images,
        categoryId,
        stock: parseInt(stock),
      },
    });
    
    res.json(product);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

app.delete('/api/products/:id', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    await prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });
    
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

// Users API
app.get('/api/users', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    if (!prisma) {
      return res.status(500).json({ error: 'Database connection not available' });
    }
    
    const { name, email, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: role || 'USER',
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });
    
    res.status(201).json(user);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Welcome Form API
app.post('/api/welcome-form', async (req, res) => {
  try {
    const { fullName, email, phoneNumber, faculty } = req.body;

    // Validate the input
    if (!fullName || !email || !phoneNumber || !faculty) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    let submission = null;
    let usedFallback = false;
    
    // Try to use Prisma if available
    if (prisma) {
      try {
        // Check if the welcomeFormSubmission model exists in the Prisma client
        if ('welcomeFormSubmission' in prisma) {
          submission = await prisma.welcomeFormSubmission.create({
            data: { fullName, email, phoneNumber, faculty }
          });
        } else {
          // Model doesn't exist, use fallback
          usedFallback = true;
        }
      } catch (dbError) {
        console.error('Database error:', dbError);
        usedFallback = true;
      }
    } else {
      usedFallback = true;
    }

    // Use file storage as fallback
    if (usedFallback) {
      submission = await saveSubmissionToFile({ fullName, email, phoneNumber, faculty });
      
      if (!submission) {
        return res.status(500).json({ error: 'Failed to save submission to file' });
      }
    }

    res.status(201).json({ 
      message: 'Form submitted successfully', 
      submission,
      note: usedFallback ? 'Saved locally due to database unavailability' : undefined 
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express API server running on port ${PORT}`);
});

module.exports = app;
