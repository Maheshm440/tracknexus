import { z } from 'zod';

/**
 * Reusable field validators
 */
const emailSchema = z.string()
  .email('Invalid email format')
  .min(5, 'Email must be at least 5 characters')
  .max(100, 'Email must not exceed 100 characters')
  .toLowerCase()
  .trim();

const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must not exceed 100 characters')
  .trim();

const phoneSchema = z.string()
  .regex(/^[\d\s\-\+\(\)]+$/, 'Invalid phone number format')
  .min(10, 'Phone number must be at least 10 characters')
  .max(20, 'Phone number must not exceed 20 characters')
  .optional();

/**
 * Lead/Contact Form Schema
 */
export const createLeadSchema = z.object({
  name: nameSchema,
  companyName: z.string().min(1, 'Company name is required').max(200).trim(),
  companyEmail: emailSchema,
  companySize: z.enum(['1-10', '10-50', '50-100', '100-500', '500+', 'Unknown']),
  mobileNumber: phoneSchema.default(''),
  message: z.string()
    .min(10, 'Message must be at least 10 characters')
    .max(1000, 'Message must not exceed 1000 characters')
    .trim(),
  formType: z.enum(['contact', 'demo', 'pricing', 'free-trial', 'signup']),
  selectedPlan: z.string().max(100).optional(),
  preferredDate: z.string().datetime().optional(),
  preferredTime: z.string().max(50).optional(),
  visitorId: z.string().uuid().optional(),
  source: z.string().max(200).optional(),
});

export type CreateLeadInput = z.infer<typeof createLeadSchema>;

/**
 * Client Schema
 */
export const createClientSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  phone: phoneSchema,
  company: z.string().max(200).optional(),
  industry: z.string().max(100).optional(),
  status: z.enum(['ACTIVE', 'INACTIVE', 'PENDING']).default('ACTIVE'),
  value: z.number().min(0).optional(),
  notes: z.string().max(1000).optional(),
});

export type CreateClientInput = z.infer<typeof createClientSchema>;

/**
 * Ticket Schema
 */
export const createTicketSchema = z.object({
  subject: z.string()
    .min(5, 'Subject must be at least 5 characters')
    .max(200, 'Subject must not exceed 200 characters')
    .trim(),
  description: z.string()
    .min(20, 'Description must be at least 20 characters')
    .max(2000, 'Description must not exceed 2000 characters')
    .trim(),
  email: emailSchema,
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH', 'URGENT']).default('MEDIUM'),
  category: z.string().max(100).optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;

/**
 * Follow-up Schema
 */
export const createFollowUpSchema = z.object({
  leadId: z.string().uuid('Invalid lead ID'),
  title: z.string()
    .min(5, 'Title must be at least 5 characters')
    .max(200, 'Title must not exceed 200 characters')
    .trim(),
  description: z.string().max(1000).optional(),
  dueDate: z.string().datetime('Invalid date format'),
  priority: z.enum(['LOW', 'MEDIUM', 'HIGH']).default('MEDIUM'),
  createdBy: z.string().uuid().optional(),
});

export type CreateFollowUpInput = z.infer<typeof createFollowUpSchema>;
