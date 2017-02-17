class RepliesController < ApplicationController
  def create
    @reply = Reply.create!(content: params[:reply][:content],
                           post_id: params[:post_id],
                           user: User.first)
    redirect_to posts_path
  end
end
