const mongoose = require("mongoose");
const { faker } = require('@faker-js/faker');
const Team = require("../schemas/Team"); 
const User = require("../schemas/User");
const Contest = require("../schemas/Contest");
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });


// 連接到你的MongoDB數據庫
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async () => {
  console.log("Connected to MongoDB");

  try {
    // 清空現有的Team集合
    await Team.deleteMany({});

    // 獲取現有的用戶和比賽作為參考數據
    const users = await User.find({});
    const contests = await Contest.find({});

    if (!users.length || !contests.length) {
      throw new Error("需要至少一個用戶和一個比賽來創建測試資料");
    }

    // 寫入json的資料
    const teamsData = [];

    // 創建測試的Team數據
    for (let i = 0; i < 5; i++) {
      const randomUsers = faker.helpers.arrayElements(users, faker.number.int({ min: 1, max: 5 }));
      const randomContest = faker.helpers.arrayElement(contests);
      const team = new Team({
        name: faker.company.name(),
        contestId: randomContest._id,
        users: randomUsers.map(user => user._id),
        notice: [
          {
            content: faker.lorem.sentence(),
            sender: faker.helpers.arrayElement(randomUsers)._id,
            createdAt: faker.date.past(),
            access: faker.datatype.boolean(),
          },
        ],
        teamAdmin: faker.helpers.arrayElement(randomUsers)._id,
        introduction: faker.lorem.paragraph(),
      });
      const savedTeam = await team.save();
      teamsData.push(savedTeam);
    }

    fs.writeFileSync(path.resolve(__dirname, '../../teamsData.json'), JSON.stringify(teamsData, null, 2));

    console.log("Test data created successfully");
  } catch (error) {
    console.error("Error creating test data: ", error);
  } finally {
    mongoose.connection.close();
  }
});
