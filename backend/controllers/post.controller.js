const Post = require('../models/post.model')
const User = require('../models/user.model')

const getPosts = async(req, res) => {
  const pageSize = +req.query.pagesize ;
  const currentPage = +req.query.page;

  console.log(pageSize)
  console.log(currentPage)
 let posts =  Post.find();



  if(pageSize && currentPage){
    posts =  await posts.skip(pageSize * (currentPage - 1)).limit(pageSize);
    console.log('1')
  }else{
    posts = await Post.find();
    console.log('2')
  }
  console.log(posts)

  const totalPost = await Post.countDocuments()


   /* const [posts , totalPost] = await Promise.all([
                          Post.find()
                          .skip(pageSize * (currentPage - 1)).limit(pageSize),
                          Post.countDocuments()
   ])
 */
   console.log(posts)
   res.json({
    ok :true,
    posts,
    totalPost
   })



}

const getPost = async(req, res) => {
   const {id} = req.params

   try {
    const post = await Post.findById(id);
    if(!post){
      return res.status(404).json({
        ok : false,
        msg : 'El usuario no existe en la base de datos'
      })
    }

    res.status(200).json({
       ok :true,
       post
    })
   } catch (error) {
    return res.status(500).json(
      {
        ok : false,
        msg : 'Internal Server Error'
      }
    )
   }
}

const creacionPost = async(req, res) => {
  const body = req.body;
  const id = req.uid
  const user = await User.findById(id);

  body.user = user;

  try {
    const post = new Post(body);
    await post.save();

    res.status(201).json({
        ok: true,

        post
    })

  } catch (error) {
    return res.status(500).json(
      {
        ok : false,
        msg : 'Internal Server Error'
      }
    )
  }



}

const updatedPost = async(req, res) => {
   const body = req.body;
   const {id} = req.params;

   try {
     const post = await Post.findById(id);
     if(!post){
      return res.status(404).json({
        ok:false,
        msg : 'El post que desea actualizar no existe!'
      })
     }
     console.log(body)

     const updatePost = await Post.findByIdAndUpdate(id,body , {new:true});

     return res.status(200).json({
      ok :true,
      updatePost
     })


   } catch (error) {
    return res.status(500).json(
      {
        ok : false,
        msg : 'Internal Server Error'
      }
    )
   }
}


const deletePost = async(req, res) => {
   const {id} = req.params;


   try {
    const post = await Post.findById(id);
     if(!post){
      return res.status(404).json({
        ok:false,
        msg : 'El post que desea eliminar no existe!'
      })
     }
     await Post.findByIdAndDelete(id,{new:true})
     res.status(200).json(
         {
          ok : true,
          msg : 'El post se ha eliminado correctamente! '
         }
     )

   } catch (error) {
    return res.status(500).json(
      {
        ok : false,
        msg : 'Internal Server Error'
      }
    )
   }

}


module.exports = {
  getPosts,
  getPost,
  creacionPost,
  updatedPost,
  deletePost
}
