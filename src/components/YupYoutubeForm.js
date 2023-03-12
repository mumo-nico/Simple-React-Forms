import React, {useState} from 'react'
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup'
import TextError from './TextError'

const initialValues = {
    name: '',
    email: '',
    channel: '',
    comments: '',
    address: '',
    social: {
        // nested objects
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''], // form field as an array
    phNumbers: ['']
}
const savedValues = {
    name: 'Mumo',
    email: 'mumo@gmail.com',
    channel: 'codevolution',
    comments: 'Welcome to FOrmik',
    address: '117 Rongai',
    social: {
        // nested objects
        facebook: '',
        twitter: ''
    },
    phoneNumbers: ['', ''], // form field as an array
    phNumbers: ['']
}
const onSubmit = (values, onSubmitProps) => {
    console.log('Form data', values)
    console.log('submit props', onSubmitProps)
    onSubmitProps.setSubmitting(false)
    onSubmitProps.resetForm()
}
const validate = values => {
    //values. name, email, channel
    //errors.name, email, channel
    //errors.name = 'this field is required'
    let errors = {}

    if (!values.name) {
        errors.name = 'Required'
        } 

    if (!values.email) {
        errors.email = 'Required'
        }  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        }

    if (!values.channel) {
        errors.channel = 'Required'
        }

    return errors

}
const validationSchema = Yup.object({
    name: Yup.string().required('Required'),
    email: Yup.string().email('Invalid Email Address').required('Required'),
    channel: Yup.string().required('Required'),
    comments: Yup.string().required('Required')
})
const validateComments = value => {
    let error
    if (!value) {
        error = 'Required'
        }
        return error
}
function YupYoutubeForm() {
    const [formValues, setFormValues] = useState(null)
  return (
    <Formik
        //initialValues={initialValues}
        initialValues={formValues || initialValues} 
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize
       // validateOnChange={false}
        //validateOnBlur={false}
        //validateOnMount
        >
        {formik => {
            console.log('Formik Props', formik)
                return (
                    <Form>
      <div className='form-control'>
        <label htmlFor='name'>Name</label>
        <Field type="text" id="name" name="name" />  
        <ErrorMessage name='name' component={TextError}/>
        </div>

        <div className='form-control'>
        <label htmlFor='email'>Email</label>
        <Field type="email" id="email" name="email" /> 
        <ErrorMessage name='email'>
            {
                (errorMsg) => <div className='error'>{errorMsg}</div>
            }
        </ErrorMessage>
        </div>

        <div className='form-control'>
        <label htmlFor='channel'>Channel</label>
        <Field type="text" id="channel" name="channel" />
        <ErrorMessage name='channel'/>
        </div>

        <div className='form-control'>
        <label htmlFor='comments'>Comments</label>
        <Field as='textarea' id="comments" name="comments" 
        validate={validateComments} />
        <ErrorMessage name='comments' component={TextError}/>
        </div>

        <div className='form-control'>
        <label htmlFor='address'>Address</label>
        <Field name="address">
            {
                (props) => {
                    const {field, form, meta} = props
                    console.log('Render props', props)
                    return (
                        <div>
                        <input type='text' id='address'{...field}/>
                        {meta.touched && meta.error ? <div>{meta.error}</div> : null}
                        </div>
                )}
            }
        </Field>
        </div>
            {/* nested objects */}
        <div className='form-control'>
            <label htmlFor='facebook'>Facebook profile</label>
            <Field type="text" id="facebook" name="social.facebook" />
        </div>

        <div className='form-control'>
            <label htmlFor='twitter'>Twitter profile</label>
            <Field type="text" id="twitter" name="social.twitter" />
        </div>

        <div className='form-control'> 
            <label htmlFor='primaryPh'>Primary Phone Number</label>
            <Field type="text" id="primaryPh" name="phoneNumbers[0]" />
        </div>

        <div className='form-control'>
            <label htmlFor='secondaryPh'>Secondary Phone Number</label>
            <Field type="text" id="secondaryPh" name="phoneNumbers[1]" />
        </div>

        <div className='form-control'>
            <label htmlFor=''>List of Phone Numbers</label>
            <FieldArray name='phNumbers'>
                {fieldArrayProps => {
                    console.log('fieldArrayProps', fieldArrayProps)
                    const {push, remove, form} = fieldArrayProps
                    const { values} = form
                    const { phNumbers} = values
                    return <div>
                        {phNumbers.map((phNumber, index )=>(
                            <div key={index}>
                            <Field name={`phNumbers[${index}]`} />
                            {index > 0 && (
                                <button type='button' onClick={() => remove(index)}> - </button>
                            )}
                           
                            <button type='button' onClick={() => push('')}> + </button>
                            </div>))}
                    </div>

                }

                }
            </FieldArray>
        </div>
        {/* <button 
            type='button' 
            onClick={() => formik.validateField('comments')}
            >Validate Comments</button>
        <button 
            type='button' 
            onClick={() => formik.validateForm()}
            >Validate All</button>
        <button 
            type='button' 
            onClick={() => formik.setFieldTouched('comments')}
            >Visit Comments</button>
        <button 
            type='button' 
            onClick={() => formik.setTouched({
                name: true,
                email: true,
                channel: true,
                comments: true
            })}
            >Visit Fields</button> */}
        <button type='button'
        onClick={() => setFormValues(savedValues)}
        >Load saved Data</button>

        <button type='submit'
        disabled={!(formik.dirty && formik.isValid)}
        >Submit</button>
        <button type='reset'>Reset</button>
      </Form>
                )
            }}
        
    </Formik>
  )
}
export default YupYoutubeForm