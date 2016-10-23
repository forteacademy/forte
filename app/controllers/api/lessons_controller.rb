class Api::LessonsController < Api::BaseController
  def index
    lessons = Lesson.all
    render json: lessons
  end

  def create
    lesson = Lesson.new lesson_params
    if lesson.save
      render json: lesson
    end
  end

  def update
    lesson = Lesson.find params[:id]
    if lesson.update_attributes lesson_params
      render json: lesson
    end
  end

  def destroy
    lesson = Lesson.find params[:id]
    lesson.destroy
    render json: lesson
  end

  def show
    lesson = Lesson.find params[:id]
    render json: lesson
  end

  def lesson_params
    params.require(:lesson).permit(
      :time,
      :is_paid,
      :feedback,
      :student_id,
      :teacher_id,
    )
  end
end