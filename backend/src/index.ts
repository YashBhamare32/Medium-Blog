import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post("/api/v1/user/signup" , async (c)=>{
  return c.text("signup ")
})

app.post("/api/v1/user/signin" , async (c)=>{
  return c.text("signin ")

})
app.post("/api/v1/blog" , async (c)=>{
  return c.text("post blog")
})
app.put("/api/v1/blog" , async (c)=>{
  return c.text("update blog")
})

app.get('/api/v1/blog/:id' , async (c)=>{
  const id = c.req.param('id');
  return c.text("get blog by id" + id);
})

// app.get("/api/v1/blog/bulk" , async (c)=>{
//   return c.text("get all blogs");
// })

export default app
