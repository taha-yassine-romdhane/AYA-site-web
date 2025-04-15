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

// Initialize Prisma client with error handling
let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (error) {
  console.error('Failed to initialize Prisma client:', error);
}

// Fallback storage for form submissions when database is unavailable
const SUBMISSIONS_FILE = path.join(process.cwd(), 'data', 'welcome-submissions.json');

// Helper function to save submissions to a JSON file when DB is unavailable
export async function saveSubmissionToFile(submission: WelcomeFormData): Promise<WelcomeFormSubmission | null> {
  try {
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
  submission?: any;
  usedFallback: boolean;
  error?: string;
}> {
  let submission;
  let usedFallback = false;
  
  // Try to use Prisma if available
  if (prisma) {
    try {
      // Check if the welcomeFormSubmission model exists in the Prisma client
      if ('welcomeFormSubmission' in prisma) {
        // @ts-ignore - We're handling this dynamically
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
    submission = await saveSubmissionToFile(data);
    
    if (!submission) {
      return {
        success: false,
        usedFallback: true,
        error: 'Failed to save submission to file'
      };
    }
  }

  return {
    success: true,
    submission,
    usedFallback
  };
}
