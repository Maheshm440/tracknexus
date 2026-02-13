import { z } from 'zod';
import { NextResponse } from 'next/server';

/**
 * Validates request body against a Zod schema
 * Returns validated data or NextResponse error
 */
export async function validateRequest<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): Promise<{ success: true; data: T } | { success: false; response: NextResponse }> {
  try {
    const validated = schema.parse(data);
    return { success: true, data: validated };
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Format Zod validation errors
      const errors = error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message,
      }));

      return {
        success: false,
        response: NextResponse.json(
          {
            success: false,
            error: 'Validation failed',
            details: errors,
          },
          { status: 400 }
        ),
      };
    }

    // Unexpected error
    return {
      success: false,
      response: NextResponse.json(
        {
          success: false,
          error: 'Invalid request data',
        },
        { status: 400 }
      ),
    };
  }
}

/**
 * Safe parse helper - returns validated data or null
 */
export function safeParse<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): T | null {
  try {
    return schema.parse(data);
  } catch {
    return null;
  }
}
