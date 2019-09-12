# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


Post.destroy_all

NUM_POSTS = 50

NUM_POSTS.times do
    current_post = Post.create({
        title: Faker::Lorem.sentence,
        body: Faker::Lorem.paragraph(sentence_count: 5)
    })

    rand(1..7).times do
        Comment.create({
            body: Faker::Hacker.say_something_smart,
            post_id: current_post.id
        })
    end

end

puts "Generated #{Post.all.count} posts."
puts "Generated #{Comment.all.count} comments."