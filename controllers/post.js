const { Post, Comment } = require('../models');

const viewAll = async (req, res) => {
  try {
    const write = await Post.findAll();
    res.status(200).json(write)
  } catch (err) {
    console.error(err);
    res.status(400).json({ message : "글 불러오기 실패"});
  }
}

const view = async (req, res) => {
  const id = req.params.id;
  try {
    const write = await Post.findOne({
      where : {id}
    })
    res.json({write})
  } catch (err) {
    console.error(err);
    res.status(400).json({ message : "글 불러오기 실패"});
  }
}

const post = async (req, res) => {
  const {title, content} = req.body;

  try {
    Post.create({
      title,
      img : req.file.path,
      content,
      user_id : req.user.id
    })

    res.status(200).json({ message : "글 등록 성공"});
  } catch (err) {
    console.error(err);
    res.status(400).json({ message : "글 등록 실패"});
  }
}

const edit = async (req, res) => {
  const { title, content } = req.body;

  try {
    await Post.update({
      id : req.params.id,
      title,
      content,
      user_id : req.user.id
    })
    res.status(200).json({ message : "글 수정 성공"});
  } catch (err) {
    console.error(err);
    res.status(400).json({ message : "글 수정 실패"});
  }
}

const remove = async (req, res) => {
  const id = req.params.id;
  try {
    await Post.destroy({ where: {id}})

    res.status(200).json({ message : "글 삭제 성공"});
  } catch (err) {
    console.error(err);

    res.status(400).json({ message : "글 삭제 실패"})
  }
}


const comment = async (req, res) => {
  const comment = req.body.comment;
  try {
    await Comment.create({
      comment,
      Post_id : req.post.id
    })
    res.status(200).json({ message : "댓글 등록 성공"})
  } catch (err) {
    console.error(err);
    res.status(400).json({ message : "댓글 성공 실패"});
  }
}


module.exports = { viewAll, view, post, edit, remove, comment };