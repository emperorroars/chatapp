const { CronJob } = require('cron');
const {Op} = require('sequelize');
const Chat = require('../models/chat');
const ArchivedChat = require('../models/archeivedchats');
exports.job = new CronJob(
    '0 0 * * *', 
    function () {
        archiveOldRecords();
    },
    null,
    false,
    'Asia/Kolkata'
);

async function archiveOldRecords() {
   try {
      const tenDaysAgo = new Date();
      tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
      // Find records to archive
      const recordsToArchive = await Chat.findAll({
        where: {
          date_time: {
            [Op.lt]: tenDaysAgo,
          },
        },
      });
  await Promise.all(
    recordsToArchive.map(async (record) => {
          await ArchivedChat.create({
            id: record.id,
            message: record.message,
            isImage:record.isImage,
             date_time: record.date_time,
           
          });
          await record.destroy();
        })
      );
      console.log('Old records archived successfully.');
    } catch (error) {
      console.error('Error archiving old records:', error);
    }
  }

