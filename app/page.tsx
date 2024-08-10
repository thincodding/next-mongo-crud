/* eslint-disable @next/next/no-async-client-component */
"use client";

async function getData() {
  try {
    const res = await fetch("http://localhost:3000/api/post", {cache: "no-store"});
    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }
    return res.json();
  }
  catch (err) {
    console.log(err)
  }
}


export default async function Home() {

  const { posts } = await getData();

  return (
    <main>
      {posts?.map((item: any) => (
        <h1 key={item.id}>{item.msg}</h1>
      ))}
      
    </main>

  );
}
