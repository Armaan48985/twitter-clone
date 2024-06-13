import { supabase } from "@/lib/supabase";

export const insertUserdata = async (namee?: string, userid?: string, username?: string) => {
    const userData: { id?: string, name?: string, username?: string } = {};
    
    if (userid) userData.id = userid;
    if (namee) userData.name = namee;
    if (username) userData.username = username;

    try {
      const { data, error } = await supabase
        .from('users')
        .insert(userData);
  
      if (error) {
        console.error('Error inserting user data:', error.message);
        throw new Error('An error occurred while inserting user data.');
      } else {
        console.log('User data inserted:', data);
        return data;
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      throw new Error('An unexpected error occurred.');
    }
  };
  