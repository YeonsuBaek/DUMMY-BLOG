import Blog from '@/components/Blog';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Dummmy Blog</title>
        <meta name='description' content="It's a fake blog" />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Blog />
    </>
  );
}
