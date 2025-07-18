
import client from "../config/redis.congif.js";
import User from "../models/user.model.js";


const getAllUsers = async (req, res) => {

  try {
       const cachedata =  await client.get('leaderboard')
       if(cachedata){
         return  res.status(200)
          .json(JSON.parse(cachedata))
       }
    const users = await User.find().sort({ totalPoints: -1 });
    const rankedUsers = users.map((user, i) => ({
      _id: user._id,
      name: user.name,
      totalPoints: user.totalPoints,
      rank: i + 1,
    }));
       
    client.set('leaderboard',JSON.stringify(rankedUsers),{
        EX:100,
    })
    return res.status(200).json(rankedUsers);
  } catch (error) {
    res.status(500).json(
        {msg:'Internal server error'}
    );
    console.log(error)
}
};

const addUser = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) return res.status(400).json({ message: 'Name required' });
  
    const newUser = await User.create({ name });
    await client.del('leaderboard')
    res.status(201).json(newUser);
} catch (error) {
    res.status(500).json({
        msg:'Internal server'
    });
    console.log(error)
    
  }
};

export{
    getAllUsers,
    addUser
}