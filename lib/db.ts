import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

// Type definitions for our form submission
export interface WelcomeFormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  faculty: string;
}

export interface WelcomeFormSubmission extends WelcomeFormData {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Define a type for the Prisma client with dynamic properties
type PrismaClientWithDynamicModels = PrismaClient & {
  welcomeFormSubmission?: {
    create: (args: { data: WelcomeFormData }) => Promise<WelcomeFormSubmission>
  }
};

// Initialize Prisma client with error handling
let prisma: PrismaClientWithDynamicModels | null = null;
try {
  prisma = new PrismaClient() as PrismaClientWithDynamicModels;
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
}

// Fallback storage for form submissions when database is unavailable
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'welcome-submissions.json');

// Helper function to check for duplicate emails in the file storage
export async function checkDuplicateEmail(email: string): Promise<boolean> {
  try {
    if (!fs.existsSync(SUBMISSIONS_FILE)) {
      return false; // No submissions file exists yet
    }
    
    const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
    const submissions: WelcomeFormSubmission[] = JSON.parse(data);
    
    // Check if email already exists (case insensitive)
    return submissions.some(sub => 
      sub.email.toLowerCase() === email.toLowerCase().trim()
    );
  } catch (error) {
    console.error('Error checking for duplicate email:', error);
    return false; // Continue if there's an error reading the file
  }
}

// Helper function to save submissions to a JSON file when DB is unavailable
export async function saveSubmissionToFile(submission: WelcomeFormData): Promise<WelcomeFormSubmission | null> {
  try {
    // Check for duplicate email first
    const isDuplicate = await checkDuplicateEmail(submission.email);
    if (isDuplicate) {
      throw new Error('This email is already registered. Please use a different email address.');
    }
    
    // Create directory if it doesn't exist
    const dir = path.dirname(SUBMISSIONS_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    
    // Read existing submissions or create empty array
    let submissions: WelcomeFormSubmission[] = [];
    if (fs.existsSync(SUBMISSIONS_FILE)) {
      const data = fs.readFileSync(SUBMISSIONS_FILE, 'utf8');
      submissions = JSON.parse(data);
    }
    
    // Create new submission with timestamp
    const newSubmission: WelcomeFormSubmission = {
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

// Function to save a welcome form submission
export async function saveWelcomeFormSubmission(data: WelcomeFormData): Promise<{
  success: boolean;
  submission?: WelcomeFormSubmission | null;
  usedFallback: boolean;
  error?: string;
}> {
  let submission: WelcomeFormSubmission | null = null;
  let usedFallback = false;
  
  // Try to use Prisma if available
  if (prisma) {
    try {
      // Check if the welcomeFormSubmission model exists in the Prisma client
      if ('welcomeFormSubmission' in prisma) {
        // @ts-expect-error - We're handling this dynamically since the model might not be in the type definitions
        submission = await prisma.welcomeFormSubmission.create({
          data
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
    try {
      submission = await saveSubmissionToFile(data);
      
      if (!submission) {
        return {
          success: false,
          usedFallback: true,
          error: 'Failed to save submission to file'
        };
      }
    } catch (error) {
      return {
        success: false,
        usedFallback: true,
        error: error instanceof Error ? error.message : 'Failed to save submission to file'
      };
    }
  }

  return {
    success: true,
    submission,
    usedFallback
  };
}
