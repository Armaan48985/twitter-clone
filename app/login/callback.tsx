import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {supabase} from '@/lib/supabase';

const AuthCallback = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const { data: { session }, error } = await supabase.auth.exchangeCodeForSession(window.location.href);
      if (error) {
        console.error('Error handling authentication redirect:', error.message);
        setMessage('An unexpected error occurred during authentication.');
      } else {
        const user = session.user;
        if (user) {
          console.log('Authenticated user:', user);
          // Insert user data into the users table
          await insertUserData(user);
          router.push('/'); // Redirect to a different page after successful authentication
        }
      }
    };

    handleAuthRedirect();
  }, [router]);

  const insertUserData = async (user) => {
    try {
      const { data, error } = await supabase
        .from('Users')
        .upsert([{ id: user.id, email: user.email, name: user.user_metadata.full_name }], { onConflict: ['id'] });

      if (error) {
        console.error('Error inserting user data:', error.message);
        setMessage('An error occurred while inserting user data.');
      } else {
        console.log('User data inserted:', data);
        setMessage('User data inserted successfully.');
      }
    } catch (error) {
      console.error('Unexpected error:', error.message);
      setMessage('An unexpected error occurred.');
    }
  };

  return (
    <div>
      {message ? message : 'Processing authentication...'}
    </div>
  );
};

export default AuthCallback;
