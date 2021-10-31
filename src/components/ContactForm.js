import { useForm } from 'react-hook-form';
import emailjs from 'emailjs-com';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const ContactForm = () => {
  const { register, errors, handleSubmit, reset } = useForm();

  const toastifySuccess = () => {
    toast('Form sent!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      className: 'submit-feedback success',
      toastId: 'notifyToast'
    });
  };

  const onSubmit = async (data) => {
    // Send form email
    try {
      const templateParams = {
        name: data.name,
        email: data.email,
        subject: data.subject,
        message: data.message
      };

      await emailjs.send(
        'service_59ne85j',
        'template_7p1hni4',
        templateParams,
        'user_3tpPmE2mQehL0DomGKYQz'
      );

      reset();
      toastifySuccess();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className='ContactForm'>
      <div className='ContactContainer'>
        <div className='row'>
          <div className='col-12 text-center'>
            <div className='contactForm'>
              <form id='contact-form' onSubmit={handleSubmit(onSubmit)} noValidate>
                {/* Row 1 of form */}
                <div className='row formRow'>
                  <div className='col-6'>
                    <input
                      type='text'
                      {...register('name', {
                        required: { value: true, message: 'Please enter your name' },
                        maxLength: {
                          value: 30,
                          message: 'Please use 30 characters or less'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Name'></input>
                    {/* {errors.name && <span className='errorMessage'>{errors.name.message}</span>} */}
                  </div>
                  <div className='col-6'>
                    <input
                      type='email'
                      {...register('email', {
                        required: true,
                        pattern: /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
                      })}
                      className='form-control formInput'
                      placeholder='Email address'></input>
                    {/* {errors.email && (
                      <span className='errorMessage'>Please enter a valid email address</span>
                    )} */}
                  </div>
                </div>
                {/* Row 2 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <input
                      type='text'
                      {...register('subject', {
                        required: { value: true, message: 'Please enter a subject' },
                        maxLength: {
                          value: 75,
                          message: 'Subject cannot exceed 75 characters'
                        }
                      })}
                      className='form-control formInput'
                      placeholder='Business Name'></input>
                    {/* {errors.subject && (
                      <span className='errorMessage'>{errors.subject.message}</span>
                    )} */}
                  </div>
                </div>
                {/* Row 3 of form */}
                <div className='row formRow'>
                  <div className='col'>
                    <textarea
                      rows={3}
                      {...register('message', {
                        required: true
                      })}
                      className='form-control formInput'
                      placeholder='Tell me about your business'></textarea>
                    {/* {errors.message && <span className='errorMessage'>Please enter a message</span>} */}
                  </div>
                </div>
                <button className='submit-btn button' type='submit'>
                  Submit
                </button>
              </form>
            </div>
           <ToastContainer></ToastContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;