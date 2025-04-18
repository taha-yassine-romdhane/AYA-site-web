import { NextRequest, NextResponse } from 'next/server';
import { saveWelcomeFormSubmission, WelcomeFormData } from '@/lib/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { fullName, email, phoneNumber, faculty } = body;

    // Validate the input
    if (!fullName || !email || !phoneNumber || !faculty) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Since we're using file storage, we'll check for duplicate emails there
    // This is handled in the saveWelcomeFormSubmission function

    // Save the submission using our data access layer
    const formData: WelcomeFormData = { fullName, email, phoneNumber, faculty };
    const result = await saveWelcomeFormSubmission(formData);

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to save submission' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { 
        message: 'Form submitted successfully', 
        submission: result.submission,
        note: result.usedFallback ? 'Saved locally due to database unavailability' : undefined 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
