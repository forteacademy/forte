class DonateModal extends React.Component {

  constructor() {
    super();
    this.state = {
      donation_amount: null,
      custom_donation_amount: null,
      full_name: null,
      email: null,
      phone_number: null,
      message: null,
      showNextScreen: false,
      errors: {},
    };
  }

  static get propTypes() {
    return {
      handleClose: React.PropTypes.func.isRequired,
    };
  }

  componentDidUpdate() {
    if (!this.state.showNextScreen) {
      const stripe = Stripe('pk_test_kWV5HAQuTjQRu7CRuQhDd1nj');
      this.stripe = stripe;
      const elements = stripe.elements();
      var style = {
        base: {
          fontSize: '16px',
          lineHeight: '24px'
        }
      };
      var card = elements.create('card', {style: style});
      this.card = card;
      card.mount('#card-element');

      card.addEventListener('change', function(event) {
      var displayError = document.getElementById('card-errors');
        if (event.error) {
          displayError.textContent = event.error.message;
        } else {
          displayError.textContent = '';
        }
      });
    }
  }

  handleChange(event) {
    var name = $(event.target).attr("name");
    var value = $(event.target).val();
    if (name === "custom_donation_amount") {
      this.setState({ donation_amount: value});
    }
    this.setState({ [name] : value });
  }

  handleNext() {
    this.setState({ showNextScreen: true });
  }

  async handleSubmit() {
    var validated = await this.validateFields();
    if (validated) {
    var state = this.state;

    this.stripe.createToken(this.card).then(function(result) {
      if (result.error) {
        var errorElement = document.getElementById('card-errors');
        errorElement.textContent = result.error.message;
      } else {
        const resolve = (result) => { this.emailAdmin() };
        const reject = (result) => { console.log(result) };
        var params = {
          amount: parseInt(state.donation_amount),
          stripe_token: result.token.id,
        };

        Requester.post(
          ApiConstants.stripe.donationCharge,
          params,
          resolve,
          reject,
        );
      }
    });
  }
  }

  emailAdmin() {
    const resolve = (result) => { console.log(result) };
    const reject = (result) => { console.log(result) };
    var params = {
      full_name: this.state.full_name,
      email: this.state.email,
      phone_number: this.state.phone_number,
      message: this.state.message,
    };

    Requester.post(
      ApiConstants.donations.donationNotify,
      params,
      resolve,
      reject,
    );
    this.handleNext();
  }

  getValidationState(name) {
    if (this.state.errors[name]) {
      return 'error';
    }
  }

  displayErrorMessage(name) {
    if (this.state.errors[name]) {
      return <HelpBlock className="error-message">{this.state.errors[name]}</HelpBlock>;
    }
  }

  validateFields() {
    var errs = {};

    errs.full_name = [this.state.full_name, "Full name is missing"];
    errs.phone_number = [this.state.phone_number, "Phone number is missing"];
    errs.email = [this.state.email, "Email is missing"];
    errs.donation_amount = [this.state.donation_amount, "Donation amount is missing"];

    this.setState({ errors: errs });
    var validated = true;
    var error_info = {};
    for (var err_type in errs) {
      if (!errs[err_type][0]) {
        validated = false;
        error_info[err_type] = errs[err_type][1];
      }
    }
    this.setState({errors: error_info});
    return validated;
  }

  renderDonateModal() {
    const { handleClose } = this.props;
    const { showNextScreen } = this.state;
    if (showNextScreen) {
      return (
        <div>
          <Modal.Body>
            Thank you for your donation!
          </Modal.Body>
          <Modal.Footer>
            <Button className="button button--outline-orange" onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </div>
      );
    } else {
      return (
        <div>
          <Modal.Body>
            <FormGroup validationState={this.getValidationState("full_name")}>
              <ControlLabel>Full Name</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Full Name"
                name="full_name"
                onChange={(event) => this.handleChange(event)}
                />
              {this.displayErrorMessage("full_name")}
            </FormGroup>

            <FormGroup validationState={this.getValidationState("email")}>
              <ControlLabel>Email</ControlLabel>
              <FormControl
                componentClass="input"
                placeholder="Email"
                name="email"
                onChange={(event) => this.handleChange(event)}
                />
              {this.displayErrorMessage("email")}
            </FormGroup>

            <FormatInput
                formName        = "Phone Number"
                inputId         = "phone_number"
                handleChange    = { (event) => this.handleChange(event) }
                validationState={(name) => this.getValidationState(name)}
                displayErrors={(name) => this.displayErrorMessage(name)} />

            <ControlLabel>Message (optional)</ControlLabel>
            <FormControl
              componentClass="input"
              placeholder="Message (optional)"
              name="message"
              onChange={(event) => this.handleChange(event)}
              />

            <FormGroup validationState={this.getValidationState("donation_amount")}>
            <ControlLabel>Donation Amount</ControlLabel>
            <Radio
              name="donation_amount"
              value={10}
              onChange={(event) => this.handleChange(event)}>
              $10.00 (Mezzoforte)
            </Radio>
            <Radio
              name="donation_amount"
              value={25}
              onChange={(event) => this.handleChange(event)}>
              $25.00 (Forte)
            </Radio>
            <Radio
              name="donation_amount"
              value={50}
              onChange={(event) => this.handleChange(event)}>
               $50.00 (Fortissimo)
            </Radio>
            <Radio
              name="donation_amount"
              value={100}
              onChange={(event) => this.handleChange(event)}>
               $100.00 (Fortississimo)
            </Radio>
            <Radio
              name="donation_amount"
              value={"other"}
              onChange={(event) => this.handleChange(event)}>
               Other
               <FormControl
                componentClass="input"
                placeholder="Other amount"
                name="custom_donation_amount"
                onChange={(event) => this.handleChange(event)}
                />
            </Radio>
            {this.displayErrorMessage("donation_amount")}
            </FormGroup>

            <ControlLabel>Card Information</ControlLabel>
            <form id="payment-form">
              <div id="card-element"></div>
              <div id="card-errors"></div>
              <Modal.Footer>
              <Button className="button button--outline-orange" onClick={handleClose}>Cancel</Button>
              <Button onClick={() => this.handleSubmit()} className="button button--solid-orange">Confirm Payment</Button>
            </Modal.Footer>
            </form>

          </Modal.Body>
        </div>
      );
    }
  }

  render() {
    const { handleClose } = this.props;

    return(
      <div>
        <Modal show={true} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Forte Donation</Modal.Title>
          </Modal.Header>
          {this.renderDonateModal()}
        </Modal>
      </div>
    );
  }
}
