/**
 * @prop isStudent            - true if is user is student
 * @prop studentId            - ID of student
 * @prop lesson               - lesson Object
 * @prop fetchUpcomingLessons - function to retrieve upcoming lessons
 * @prop fetchRecentLessons   - function to retrieve recent lessons
 * @prop is_last_lesson       - true if this lesson is the last
 */
class LessonCard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showCancelModal: false,
      showRescheduleModal: false,
      showPayModal: false,
      showFeedbackModal: false,
    };
  }

  static get propTypes() {
    return {
      isStudent: React.PropTypes.bool,
      studentId: React.PropTypes.number,
      lesson: React.PropTypes.object,
      fetchUpcomingLessons: React.PropTypes.func,
      fetchRecentLessons: React.PropTypes.func,
      is_last_lesson: React.PropTypes.bool,
    };
  }

  // Functions to handle opening and closing of modals associated with each lesson: Cancel, Reschedule, and Pay Modal
  openCancelModal() {
    this.setState({ showCancelModal: true });
  }

  closeCancelModal() {
    this.setState({ showCancelModal: false });
  }

  openRescheduleModal() {
    this.setState({ showRescheduleModal: true });
  }

  closeRescheduleModal() {
    this.setState({ showRescheduleModal: false });
  }

  openPayModal() {
    this.setState({ showPayModal: true });
  }

  closePayModal() {
    this.setState({ showPayModal: false });
  }

  openFeedbackModal() {
    this.setState({ showFeedbackModal: true });
  }

  closeFeedbackModal() {
    this.setState({ showFeedbackModal: false });
  }

  /**
   * Renders CancelModal component
   */
  renderCancelModal() {
    const { isStudent, lesson, fetchUpcomingLessons } = this.props;
    const { showCancelModal } = this.state;

    if (showCancelModal) {
      return (
        <CancelModal
          lesson={lesson}
          handleClose={() => this.closeCancelModal()}
          fetchUpcomingLessons={fetchUpcomingLessons}
          isStudent={isStudent}
        />
      );
    }
  }

  /**
   * Renders RescheduleModal component
   */
  renderRescheduleModal() {
    const { isStudent, lesson, fetchUpcomingLessons } = this.props;
    const { showRescheduleModal } = this.state;
    if (showRescheduleModal) {
      return (
        <RescheduleModal
          lesson={lesson}
          handleClose={() => this.closeRescheduleModal()}
          fetchUpcomingLessons={fetchUpcomingLessons}
          isStudent={isStudent}
        />
      );
    }
  }

  /**
   * Renders PayModal component
   */
  renderPayModal() {
    const { lesson, fetchRecentLessons } = this.props;
    const { showPayModal } = this.state;
    if (showPayModal) {
      return (
        <PayModal
          lesson={lesson}
          handleClose={() => this.closePayModal()}
          fetchRecentLessons={fetchRecentLessons}
        />
      );
    }
  }

  /**
   * Renders FeedbackModal component
   */
  renderFeedbackModal() {
    const { fetchRecentLessons } = this.props;
    const { showFeedbackModal } = this.state;

    if (showFeedbackModal) {
      return (
        <FeedbackModal
          handleClose={() => this.closeFeedbackModal()}
          lesson={this.props.lesson}
          fetchRecentLessons={fetchRecentLessons}
          studentId={this.props.studentId}
        />
      )
    }
  }

  /**
   * Render appropriate buttons for each modal
   */
  renderButtons() {
    let cancelBtn, rescheduleBtn, feedbackBtn, payBtn;
    const storedRecent = JSON.parse(localStorage.getItem("recentLesson"));
    const { lesson, isStudent, is_last_lesson } = this.props;
    const { start_time, is_paid, student_feedback } = lesson;

    var now = moment();
    var date = moment(start_time);

    if (date > now && !is_last_lesson) {
      cancelBtn =
        <div>
          <Button className="button button--outline-orange button--sm" onClick={() => this.openCancelModal()}>
          Cancel
          </Button>
          {this.renderCancelModal()}
        </div>

      rescheduleBtn =
        <div>
          <Button className="button button--outline-orange button--sm" onClick={() => this.openRescheduleModal()}>
          Reschedule
          </Button>
          {this.renderRescheduleModal()}
        </div>
    }

    if (now >= date) {
      if (isStudent && !is_paid && parseInt(lesson.price) !== 0) {
        payBtn =
          <div>
            <Button className="button button--outline-orange button--sm" onClick={() => this.openPayModal()}>
              Pay Now
            </Button>
            {this.renderPayModal()}
          </div>
      }

      if (isStudent && !student_feedback && (storedRecent == lesson.id)) {
        feedbackBtn =
          <div>
            <Button className="button button--outline-orange button--sm" onClick={() => this.openFeedbackModal()}>
              Leave Feedback
            </Button>
            {this.renderFeedbackModal()}
          </div>
      }
    }

    return {
      cancelBtn: cancelBtn,
      rescheduleBtn: rescheduleBtn,
      feedbackBtn: feedbackBtn,
      payBtn: payBtn,
    }
  }

  render() {
    const { isStudent, lesson } = this.props;
    const {
      price,
      start_time,
      teacher,
      student,
      matching,
      is_paid,
    } = lesson;
    const { cancelBtn, rescheduleBtn, feedbackBtn, payBtn } = this.renderButtons();

    var startTime = moment(start_time);
    //TODO: Make sure right timezones and stuff
    if (isStudent) {
      var name = `${teacher.first_name} ${teacher.last_name}`;
    } else {
      var name = `${student.first_name} ${student.last_name}`;
    }
    var paidLabelText = is_paid ? 'Paid' : 'Unpaid';
    var paidLabelStyle = is_paid ? 'success' : 'danger';
    var floatPrice = parseFloat(price).toFixed(2);

    return (
      <div className="lesson-card">
        <div className="lesson-time-container">
          <h2>{startTime.format('MMM DD').toUpperCase()}</h2>
          <h4>{startTime.format('ddd')}, {startTime.format('hh:mm A')}</h4>
        </div>
        <div className="logistics">
          <h4>{matching.instrument} Lesson</h4>
          <div className="cost">
            <div className="info-row">
              <h5>${floatPrice}</h5>
              <Label bsStyle={paidLabelStyle}>{paidLabelText}</Label>
            </div>
          </div>
        </div>
        <div className="details">
          <div className="info-row details-row">
            <img src={ImageConstants.icons.person} href="#" />
            <h5>{name}</h5>
          </div>
          <div className="info-row details-row">
            <img src={ImageConstants.icons.location} href="#" />
            <h5>{lesson.location}</h5>
          </div>
        </div>
        <div className="actions">
          {cancelBtn}
          {rescheduleBtn}
          {payBtn}
          {feedbackBtn}
        </div>
      </div>
    );
  }
}
