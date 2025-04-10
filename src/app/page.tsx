import { redirect } from 'next/navigation';

const HomePage = () => {
  redirect('/internal');
};

export default HomePage;