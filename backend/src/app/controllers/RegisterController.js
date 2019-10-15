import { isAfter } from 'date-fns';
import { Op } from 'sequelize';
import Register from '../models/Register';
import Meetup from '../models/Meetup';
import User from '../models/User';
import Queue from '../../lib/Queue';
import ConfirmationMail from '../jobs/ConfirmationMail';

class RegisterController {
  async store(req, res) {

    const { email, meetupId } = req.body;
    console.log(email);
    console.log(meetupId);

    const user = await User.findOne({ where: { email } });
    console.log(user);
    const checkIfAlreadyRegistered = await Register.findOne({
      where: {
        user_id: user.id,
        meetup_id: meetupId,
        canceled_at: { [Op.is]: null },
      },
    });
    console.log(checkIfAlreadyRegistered);

    if (checkIfAlreadyRegistered) {
      return res.status(401).json({ error: 'Você já participa deste evento' });
    }

    const meetup = await Meetup.findByPk(req.body.meetupId);

    if (!meetup) {
      return res.status(404).json({ error: 'Evento não encontrado' });
    }

    if (meetup.user_id === req.userId) {
      return res.status(401).json({ error: 'Não é possível se inscrever para seu próprio evento' });
    }

    if (!isAfter(meetup.date, new Date())) {
      return res.status(400).json({ error: 'Este evento já ocorreu' });
    }

    const userMeetups = await Register.findAll({
      where: {
        user_id: req.userId,
        canceled_at: [{ [Op.not]: null }],
      },
    });

    const meetupIds = userMeetups.map(id => id.meetup_id);

    const countMeetupsInDate = await Meetup.count({
      where: {
        id: {
          [Op.in]: meetupIds,
        },
        date: meetup.date,
      },
    });

    if (countMeetupsInDate > 0) {
      return res
        .status(400)
        .json({ error: 'Não é possível se inscrever em eventos concorrentes' });
    }

    const register = await Register.create({
      user_id: req.userId,
      meetup_id: req.body.meetupId,
    });

    const mailData = await Register.findOne({
      where: {
        user_id: req.userId,
        meetup_id: req.body.meetupId,
      },
      attributes: ['id'],
      include: [
        {
          model: Meetup,
          as: 'meetup',
          attributes: ['name'],
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['fullname', 'email'],
            },
          ],
        },
        {
          model: User,
          as: 'user',
          attributes: ['fullname', 'email'],
        },
      ],
    });
    try {

      await Queue.add(ConfirmationMail.key, {
        mailData,
      });

      return res.json(register);
    }
    catch (erro) { console.log(erro.Message); }
  }

  async delete(req, res) {
    const { meetupId } = req.params;
    const { userId } = req;

    const meetup = await Register.findOne({
      where: {
        user_id: userId,
        meetup_id: meetupId,
        canceled_at: null,
      },
    });

    if (!meetup) {
      return res.status(404).json({ error: 'Not found' });
    }

    meetup.canceled_at = new Date();

    await meetup.save();

    return res.json(meetup);
  }
}

export default new RegisterController();
