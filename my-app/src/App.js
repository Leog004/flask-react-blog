import axios from "axios";
import React,{useEffect, useState} from "react";
import { BlogItem } from "./components";
import Header from './components/Header';

function App() {

  const [arcticles, setArcticles] = useState();

  useEffect(() => {
    getBlogs()
  }, []);

  const getBlogs = async () => {
    const data = await axios.get('/api/blog')
    const {blogs} = data.data 
    setArcticles(blogs)

  }

  const deleteHandle = async (e) => {
    await axios.delete(`/api/blog/${e}`)
    const updatedBlogs = arcticles.filter(el => el.slug !== e);
    setArcticles(updatedBlogs)
  }

  const editHandle = async (arr) => {
    let editText = arr[0].text
    let editImageUrl = arr[0].imageUrl
    let editTitle = arr[0].title

    const update = await axios.put(`/api/blog/${arr[0].slug}`, {"title": editTitle, "text": editText, "imageUrl" : editImageUrl})
    
    const {data, oldSlug} = update.data

    // console.log(update.data.oldSlug);
    // console.log(update.data.data);
    
    const updatedBlog = arcticles.map(el => {
      if(el.slug === oldSlug){
        return el = data
      }
      return el;
    })

    setArcticles(updatedBlog)

   
  }
  
  return (
    <main>
    <Header/>
      <section className="w-full min-h-screen h-full max-w-5xl mx-auto">
        {
          arcticles && arcticles.length > 0 && (
            <div className="py-20">
              <div className="grid grid-cols-3 gap-y-8">
                {
                  arcticles.map((el) => (
                    <BlogItem editHandle={editHandle} deleteHandle={() => deleteHandle(el.slug)} key={el.title} data={el} />
                  ))
                }
              </div>   
            </div>
          )
        }

      </section>
    </main>
  );
}

export default App;