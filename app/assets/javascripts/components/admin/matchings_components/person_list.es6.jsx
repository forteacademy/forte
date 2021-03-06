/**
  * @prop people        - array of people that this component encapsulates
  * @prop onPersonClick - function to handle selecting a person
  * @prop isStudent     - true if the people in this list are students
  */
class PersonList extends React.Component {

  static get PropTypes() {
    return {
      people: React.PropTypes.array,
      onPersonClick: React.PropTypes.func,
      isStudent: React.PropTypes.bool,
    };
  }

  /** Renders a description for a single person
    * @param person 
    */
  renderPerson(person) {
    if (this.props.isStudent) {
      return (
        <StudentDescription
          student={person}
          key={person.id}
          onClick={this.props.onPersonClick} />
      );
    } else {
      return (
        <TeacherDescription
          teacher={person}
          key={person.id}
          onClick={this.props.onPersonClick} />
      );
    }
  }

  renderPeople() {
    return this.props.people.map((person) => this.renderPerson(person));
  }

  render () {
    return (
      <div className="person-list">
        {this.renderPeople()}
      </div>
    );
  }
}
