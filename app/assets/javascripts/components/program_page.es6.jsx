class ProgramPage extends React.Component {

  get styles() {
    return {
      container: {
        padding: '0 70px',
        backgroundColor: StyleConstants.colors.white,
      },
      topic: {
        color: StyleConstants.colors.orange,
      },
      text: {
        color: StyleConstants.colors.grey,
      },
    };
  }

  render () {
    return (
      <div style={StyleConstants.pages.default}>
        <Header />
        <div style={this.styles.container}>
          <h1 style={this.styles.topic}> How Forte Works </h1>
          <h3 style={this.styles.text}> 
          We connect aspiring musicians with instructions to offer 
          lessons at deeply discounted rates.
          </h3>
          <p style={this.styles.text}> 
          Far too often, aspiring youth musicians are barred from pursuing their 
          musical passions due to their financial situation. Forte’s online platform 
          matches underprivileged youth with experienced musicians willing to provide 
          deeply discounted music lessons. Our passionate teachers give back to the 
          community by providing an opportunity that these students wouldn't otherwise 
          have access to. While typical private instruction costs $30 - $60 per hour, 
          our students are able to learn from quality instructors for only $15 per 
          45-minute session. 
          </p>
          <p style={this.styles.text}> 
          Prospective students and teachers apply for out program online with a 
          brief survey including personal details, instrument interest and mobility 
          preferences. Selected individuals are then invited to register for our 
          online platform where they can schedule weekly 45-minute lessons, provide 
          feedback and access our educational resources. 
          </p>
          <p style={this.styles.text}> 
          Prospective students and teachers are thoroughly vetted by our team 
          before being invited to use our platform. This includes detailed background 
          checks for all instructors and strict eligibility requirements for students 
          based on financial need. 
          </p>
          <h1 style={this.styles.topic}> Our Teachers </h1>
          <h3 style={this.styles.text}> 
          We are deeply rooted in the tradition of using music to serve our 
          community.
          </h3>
          <p style={this.styles.text}> 
          Forte’s roots trace back to 2008, when our CEO formed a service 
          organization at Homestead High School allowing student musicians to 
          collaborate via small ensembles. Ranging from duos to quintets, these 
          intimate groups inspired levels of student independence and creativity 
          greater than those typically afforded by school-wide bands, orchestras 
          or, choirs. Through this organization, students connected with and 
          enriched the local community via public performances for audiences 
          including HCR ManorCare, the Santa Clara Valley Blind Center, and the 
          J.W. House of Kaiser Permanente. 
          </p>
          <h1 style={this.styles.topic}> Our Students </h1>
          <h3 style={this.styles.text}> 
          We are deeply rooted in the tradition of using music to serve our 
          community.
          </h3>
          <p style={this.styles.text}> 
          Forte’s roots trace back to 2008, when our CEO formed a service 
          organization at Homestead High School allowing student musicians to 
          collaborate via small ensembles. Ranging from duos to quintets, these 
          intimate groups inspired levels of student independence and creativity 
          greater than those typically afforded by school-wide bands, orchestras 
          or, choirs. Through this organization, students connected with and 
          enriched the local community via public performances for audiences 
          including HCR ManorCare, the Santa Clara Valley Blind Center, and the 
          J.W. House of Kaiser Permanente. 
          </p>
        </div>
        <Footer />
      </div>
    );
  }
}
