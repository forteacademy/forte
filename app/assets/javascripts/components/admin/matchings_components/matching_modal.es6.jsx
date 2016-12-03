class MatchingModal extends React.Component {

  constructor() {
    super();
    this.state = {
      showNextScreen: false,
      lessonTime: [],
      location: '',
      errors: '',
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
      student: React.PropTypes.object.isRequired,
      teacher: React.PropTypes.object.isRequired,
      instrument: React.PropTypes.string.isRequired,
    };
  }

  async handleNext() {
    await this.setState({ errors: '' });
    await this.validateForm();
    await this.setLessonTime();
    const { errors } = this.state;
    if (errors == '') {
      this.setState({ showNextScreen: true });
    }
  }

  handleBack() {
    this.setState({
      showNextScreen: false,
      location: '',
      lessonTime: [],
    });
  }

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    this.setState({ [name] : value });
  }

  validateForm() {
    const { location } = this.state;
    if (location == '') {
      this.setState({ errors: "Please choose a location for the lesson."});
    }
    return true;
  }

  setLessonTime() {
    const { calendar } = this.refs.calendar.refs;
    var eventArray = $(calendar).fullCalendar('clientEvents', (event) => {
      if (event.rendering == 'background') {
        return false;
      }
      return true;
    });
    if (eventArray.length != 1) {
      this.setState({ errors: "Make sure only one lesson time is selected." });
      return false;
    } 
    var lessonTime = range_to_array(eventArray[0]['start'], eventArray[0]['end']);
    if (lessonTime.length != 3) {
      this.setState({ errors: "Make sure the lesson time is 45 minutes long." });
      return false;
    }
    this.setState({ lessonTime: lessonTime });
    return true;
  }

  makeMatching() {
    const { student, teacher, instrument } = this.props;
    const { lessonTime, location } = this.state;
    route = ApiConstants.matchings.create;
    var params = {
      matching: {
        student_id: student.id,
        teacher_id: teacher.id,
        instrument: instrument,
        location: location,
        lesson_time: lessonTime,
      }
    };
    var resolve = (response) => {
      window.location = RouteConstants.admin.unmatched;
    };
    var reject = (response) => console.log(response);
    Requester.post(
      route,
      params,
      resolve,
      reject,
    );
  }
  
  renderErrors() {
    const { errors } = this.state;
    if (errors != '') {
      return (
        <Alert bsStyle="danger">
          {errors}
        </Alert>
      )
    };
  }

  renderBody() {
    const { handleClose, student, teacher } = this.props;
    const { showNextScreen } = this.state;
    var overlappingAvailability = intersection(student.availability, teacher.availability);
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            Are you sure you wish to match student {student.full_name} with teacher {teacher.full_name}? Emails will 
            be sent out to both of them notifying them of their match.
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={() => this.handleBack()}>Back</Button>
            <Button className="button button--solid-orange" onClick={() => this.makeMatching()}>Confirm</Button>
          </Modal.Footer>
        </div>
      )
    } else {
      return (
        <div>
          <Modal.Body>
            {this.renderErrors()}
            <MatchingCalendar 
              ref="calendar" 
              availability={overlappingAvailability} /> 
            <FormGroup>
              <ControlLabel>Location</ControlLabel>
              <FormControl
                componentClass="select"
                name="location"
                onChange={(event) => this.handleChange(event)}>
                <option value="" disabled selected>Select a lesson location</option>
                <option 
                  value={teacher.full_address}>
                  Teacher's House
                </option>
                <option
                  value={student.full_address}>
                  Student's House
                </option>
              </FormControl>
            </FormGroup>
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Cancel</Button>
            <Button className="button button--solid-orange" onClick={() => this.handleNext()}>OK</Button>
          </Modal.Footer>
        </div>
      );
    }
  }

  render() {
    const { handleClose } = this.props;
    return (
      <div>
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Matching</Modal.Title>
          </Modal.Header>
          {this.renderBody()}
        </Modal>
      </div>
    );
  }
}