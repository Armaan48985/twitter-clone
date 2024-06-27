'use client'
import { supabase } from "@/lib/supabase"
import { useSelector } from "react-redux"


export const postTweet = async ({tweet, currUser}:{tweet:string , currUser: string}) => {

    if(!currUser){
      logOut()
    }

    if(tweet.length > 0) {
      console.log('working')
    try {
      const { data, error } = await supabase
        .from('tweets')
        .insert({
          tweet: tweet,
          created_by: currUser,
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

 export const getTweetUser = async ({tweetUserId, setTweetUser}:any) => {
  const { data: tweetUserr, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", tweetUserId);

  if (tweetUserr) {
    setTweetUser(tweetUserr[0]);
  }
};


export const postComment = async ({currUser, tweet, content}:any) => {
  if(!currUser){
    logOut()
  }

  const{data, error} = await supabase.from('comments').insert([{comment: content, created_by: currUser.userId, comment_on: tweet.id}]).select('*')
  
  if(data){
    await supabase.from('tweets').update({comments: tweet.comments + 1}).eq('id', tweet.id)
  }
}

export const setUserDataa = async (setCurrUserData: React.Dispatch<React.SetStateAction<any>>) => {
  const { data: user, error: userError } = await supabase.auth.getUser();
  
  if (userError) {
    console.error('Error fetching user:', userError.message);
    return;
  }

  const { data, error } = await supabase.from('users').select('*').eq('id', user?.user?.id);

  if (error) {
    console.error('Error fetching user:', error.message);
    return;
  }

  if (data && data.length > 0) {
    setCurrUserData(data[0]);
  }
};

export const getTweets = async ({setTweets, setLoading}:any) => {
  const { data, error } = await supabase.from('tweets').select('*');
    if (error) {
      console.error('Error fetching tweets:', error);
    } else {
      setTweets(data);
      setLoading(false);
    }
}


export const getPosts = async ({setPosts, id}:any) => {
  const { data, error } = await supabase.from('tweets').select('*').eq('created_by', id);
    if (error) {
      console.error('Error fetching posts:', error);
    } else {
      setPosts(data);
    }

}


export const logOut = async () => {
  await supabase.auth.signOut()
}