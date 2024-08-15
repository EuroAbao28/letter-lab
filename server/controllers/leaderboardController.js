const leaderboardModel = require("../models/leaderboardModel");

const addEntry = async (req, res) => {
  try {
    const { user, gender, score, mode } = req.body;

    if (!user || gender === null || score === 0 || !mode)
      return res.status(400).json({ message: "Invalid entry" });

    // find the name if exist
    const existingUser = await leaderboardModel.findOne({
      user,
      gender,
      mode,
    });

    if (existingUser) {
      // if your star is higher that the current, set a new
      if (score > existingUser.score) {
        existingUser.score = score;
        await existingUser.save();

        return res.status(200).json({
          message: "New highest star for this user 🎉",
        });
      } else {
        return res.status(200).json({
          message: "You did not surpass the current highest for this user 😢",
        });
      }
    }

    const response = await leaderboardModel.create({
      user,
      gender,
      score,
      mode,
    });

    res.status(201).json({ message: "Shared successfully 🎉", status: "new" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getEntries = async (req, res) => {
  try {
    const { mode } = req.params;
    const response = await leaderboardModel.find({ mode }).sort({ score: -1 });

    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = { addEntry, getEntries };
