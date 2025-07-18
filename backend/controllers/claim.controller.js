import User from "../models/user.model.js";
import ClaimHistory from "../models/claimhistory.model.js";
import client from "../config/redis.congif.js";

const claimPoints = async (req, res) => {
 try {
     const { userId } = req.body;
   
     if (!userId) return res.status(400).json({ message: 'User ID required' });
   
     const points = Math.floor(Math.random() * 10) + 1;
     const user = await User.findById(userId);
   
     if (!user) return res.status(404).json({ message: 'User not found' });
   
     user.totalPoints += points;
     await user.save();
   
     await ClaimHistory.create({ userId, pointsClaimed: points });
      await client.del('leaderboard');
   
     res.status(200).json({ message: 'Points claimed', points });
    } catch (error) {
        
        res.status(500).json({ 
            msg:'Internal server'
        });
        console.log(error)
 }
};
const getClaimHistory = async (req, res) => {
  try {
    const history = await ClaimHistory.find()
      .sort({ claimedAt: -1 })
      .populate("userId", "name");

    res.status(200).json(history);
  } catch (err) {
    console.error("Error fetching claim history:", err);
    res.status(500).json({ error: "Failed to fetch claim history" });
  }
};


export {
    claimPoints,
getClaimHistory
}
