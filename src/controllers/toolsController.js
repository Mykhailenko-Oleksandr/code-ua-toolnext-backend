import { Tool } from '../models/tool.js';

export const updateTool = async (req, res, next) => {
  try {
    const { toolId } = req.params;
    const updates = req.body;
    const currentUserId = req.user.id;


    if (updates.owner) {
        return res.status(400).json({
            message: 'Зміна власника заборонена.'
        });
    }

    const updatedTool = await Tool.findOneAndUpdate(
      {
        _id: toolId,
        owner: currentUserId
      },
      updates,
      { new: true, runValidators: true }
    );


    if (!updatedTool) {

      const toolExists = await Tool.findById(toolId).select('_id');

      if (!toolExists) {

        return res.status(404).json({ message: 'Інструмент не знайдено.' });
      } else {
        return res.status(403).json({
            message: 'Доступ заборонено. Тільки власник може редагувати інструмент.'
        });
      }
    }

    return res.status(200).json({
        message: 'Інструмент успішно оновлено.',
        tool: updatedTool
    });

  } catch (err) {
    next(err);
  }
};
