import Notification from '../schemas/Notification';
import User from '../models/User';
import { request } from 'express';

class NotificationController {
  async index(request, response) {
    const checkisProvider = await User.findOne({
      where: { id: request.userId, provider: true },
    });

    if (!checkisProvider) {
      return response
        .status(401)
        .json({ error: 'only provider can load notifications' });
    }

    const notifications = await Notification.find({
      user: request.userId,
    })
      .sort({ createdAt: 'desc' })
      .limit(20);

    return response.json(notifications);
  }

  async update(request, response) {
    const notifications = await Notification.findByIdAndUpdate(
      request.params.id,
      { read: true },
      { new: true }
    );

    return response.json(notifications);
  }
}

export default new NotificationController();
