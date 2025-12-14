import { Router } from 'express';
import { celebrate } from 'celebrate';
import {
  checkAvailability,
  createBooking,
} from '../controllers/bookingsController.js';
import {
  checkAvailabilitySchema,
  createBookingSchema,
} from '../validations/bookingValidations.js';
import { authenticate } from '../middleware/authenticate.js';

const router = Router();

router.get(
  '/tools/:toolId/availability',
  celebrate(checkAvailabilitySchema),
  checkAvailability,
);

router.post(
  '/bookings/:toolId',
  authenticate,
  celebrate(createBookingSchema),
  createBooking,
);

export default router;
