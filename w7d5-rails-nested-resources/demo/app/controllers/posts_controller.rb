class PostsController < ApplicationController
  def index
    @posts = Post.all
    @reply = Reply.new
    render "index"
  end
end
