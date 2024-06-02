import { supabase } from "@/lib/supabase"


export const postTweet = async (tweet:string) => {

    if(tweet.length > 0) {
      console.log('working')
    try {
      const { data, error } = await supabase
        .from('tweets')
        .insert({
          tweet: tweet,
        });
      if (error) {
        console.error('Error inserting user data:', error.message, error.details, error.hint, error.code);
      } else {
        console.log('User data inserted:', data);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  }
}

export const deleteTweet = async () => {

}

    

    