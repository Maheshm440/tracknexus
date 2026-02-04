import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { LeadStatus } from '@prisma/client';
import { sanitizeText, sanitizeEmail } from '@/lib/sanitize';

interface CreateLeadRequest {
  name: string;
  companyName: string;
  companyEmail: string;
  companySize: string;
  mobileNumber: string;
  message: string;
  formType: string;
  selectedPlan?: string;
  preferredDate?: string;
  preferredTime?: string;
  visitorId?: string;
  source?: string;
}

// POST - Create a new lead
export async function POST(request: NextRequest) {
  try {
    const body: CreateLeadRequest = await request.json();
    const {
      name,
      companyName,
      companyEmail,
      companySize,
      mobileNumber,
      message,
      formType,
      selectedPlan,
      preferredDate,
      preferredTime,
      visitorId,
      source,
    } = body;

    // Validate required fields
    if (!name || !companyEmail || !message || !formType) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // SECURITY FIX #13: Sanitize all user inputs
    const sanitizedData = {
      name: sanitizeText(name),
      companyName: sanitizeText(companyName || ''),
      companyEmail: sanitizeEmail(companyEmail),
      companySize: sanitizeText(companySize || ''),
      mobileNumber: sanitizeText(mobileNumber || ''),
      message: sanitizeText(message),
      formType: sanitizeText(formType),
      selectedPlan: selectedPlan ? sanitizeText(selectedPlan) : undefined,
      preferredTime: preferredTime ? sanitizeText(preferredTime) : undefined,
      source: source ? sanitizeText(source) : undefined,
    };

    // Calculate lead score
    const score = calculateLeadScore({
      formType: sanitizedData.formType,
      companySize: sanitizedData.companySize,
      hasPhone: Boolean(sanitizedData.mobileNumber),
      visitorId,
    });

    // SECURITY FIX #14: Proper error handling - return error if database fails
    try {
      const lead = await prisma.lead.create({
        data: {
          name: sanitizedData.name,
          companyName: sanitizedData.companyName,
          companyEmail: sanitizedData.companyEmail,
          companySize: sanitizedData.companySize,
          mobileNumber: sanitizedData.mobileNumber,
          message: sanitizedData.message,
          formType: sanitizedData.formType,
          selectedPlan: sanitizedData.selectedPlan,
          preferredDate: preferredDate ? new Date(preferredDate) : null,
          preferredTime: sanitizedData.preferredTime,
          visitorId,
          source: sanitizedData.source,
          score,
        },
      });

      return NextResponse.json({
        success: true,
        leadId: lead.id,
        score: score,
      });
    } catch (dbError) {
      // SECURITY FIX #20: Don't log sensitive data
      console.error('Database error creating lead');
      return NextResponse.json(
        {
          success: false,
          error: 'Failed to save lead. Please try again.'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    // SECURITY FIX #20: Generic error message, no sensitive details
    console.error('Create lead error');
    return NextResponse.json(
      {
        success: false,
        error: 'Invalid request data'
      },
      { status: 400 }
    );
  }
}

// GET - List leads with filters
export async function GET(request: NextRequest) {
  try {
    // Note: This is a server-side API route, so we cannot access localStorage directly
    // Return empty data for now - the client will handle localStorage
    // In a real app, this would query a database

    return NextResponse.json({
      success: true,
      data: [],
      pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
      },
      note: 'Using client-side localStorage for demo. Check dashboard for data.'
    });
  } catch (error) {
    console.error('List leads error');
    return NextResponse.json({
      success: false,
      error: 'Failed to fetch leads'
    }, { status: 500 });
  }
}

// Lead scoring algorithm
function calculateLeadScore(factors: {
  formType: string;
  companySize: string;
  hasPhone: boolean;
  visitorId?: string;
}): number {
  let score = 0;

  // Form type scoring
  const formTypeScores: Record<string, number> = {
    pricing: 15,
    demo: 12,
    'free-trial': 8,
  };
  score += formTypeScores[factors.formType] || 5;

  // Company size scoring
  const companySizeScores: Record<string, number> = {
    '500+': 10,
    '100-500': 8,
    '50-100': 5,
    '10-50': 3,
    '1-10': 1,
  };
  score += companySizeScores[factors.companySize] || 0;

  // Has phone number
  if (factors.hasPhone) {
    score += 5;
  }

  // Has visitor tracking (returning visitor indicator)
  if (factors.visitorId) {
    score += 10;
  }

  return Math.min(score, 100);
}
