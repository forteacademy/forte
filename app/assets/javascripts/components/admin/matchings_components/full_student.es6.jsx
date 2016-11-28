class FullStudent extends React.Component {

  static get PropTypes() {
    return {
      student: React.PropTypes.object,
      instrument: React.PropTypes.string,
    };
  }

  render () {
    return (
      <div className="full-student">
        <p>Name: {this.props.student.first_name} {this.props.student.last_name}</p>
        <p>City: {this.props.student.city}</p>
        <p>instrument: {this.props.instrument}</p>
      </div>
    );
  }
}
