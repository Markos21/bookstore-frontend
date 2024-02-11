export default function validateAddressForm(values, setErrors) {
  const errors = {};





  //address

  if (!values.address) {
    errors.address = 'Address Required';
  } else if (values.address?.length < 3) {
    errors.address = 'The address must be at least 3 characters long';
  }

  //city

  if (!values.city) {
    errors.city = 'City Required';
  } else if (values.city?.length < 3) {
    errors.city = 'The city must be at least 3 characters long';
  } else if (!/^[A-Za-z]+(?:[ _-][A-Za-z]+)*$/i.test(values.city)) {
    errors.city = 'The city is invalid';
  }

  //state

  if (!values.state) {
    errors.state = 'Province/Required State';
  } else if (values.state?.length < 3) {
    errors.state = 'The field must be at least 3 characters long';
  } else if (!/^[A-Za-z]+(?:[ _-][A-Za-z]+)*$/i.test(values.state)) {
    errors.state = 'The state is invalid';
  }

  if (!values.zip) {
    errors.zip = 'Required Zip Code';
  } else if (values.zip?.length < 4 || values.zip?.length > 6) {
    errors.zip = 'The zip code must be 4 to 6 characters long';
  } else if (!/^[0-9]{4,6}$/i.test(values.zip)) {
    errors.zip = 'Invalid zip code';
  }

  //phoneNumber

  if (!values.phoneNumber) {
    errors.phoneNumber = 'Phone Required';
  } else if (
    values.phoneNumber?.length < 8 ||
    values.phoneNumber?.length > 10
  ) {
    errors.phoneNumber = 'The phone must be 8 to 10 characters long';
  } else if (!/^[0-9]{8,10}$/i.test(values.phoneNumber)) {
    errors.phoneNumber = 'Phone is invalid';
  }

  setErrors(errors);

  return Object.keys(errors).length === 0 ? true : false;
}
