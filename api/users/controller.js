const async = require('async');
const { UsersSchema } = require('../../db/models');

const postScore = async (request, h) => {

    try {

        const { username, highScore } = request.payload;

        const user = await UsersSchema.findOne({username});

        if (user) {

            if(user.highScore < highScore) {
                user.highScore = highScore;
                await user.save()
            }

        }
        else {
            
            const _user = new UsersSchema({username: username, highScore: highScore});

            await _user.save()

        }


        var scores = [];
        var users = await UsersSchema.find({});

        users.forEach(user => {
            
            scores.push({username: user.username, highScore: user.highScore})

        });

        scores = scores.sort((a,b) => a.highScore > b.highScore ? -1 : b.highScore > a.highScore ? 1 : 0);

        return scores;


    } catch (err) {

        return err;

    }

}

exports.postScore = postScore