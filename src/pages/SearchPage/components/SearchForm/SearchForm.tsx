import React from 'react'
import useHandleSearchForm from './hooks/useHandleSearchForm'
import { Formik, Form as FormikForm } from 'formik'

const SearchForm: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { initialValues, initialTouched, onSubmit } = useHandleSearchForm()

  return (
    <Formik
      enableReinitialize
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={initialValues}
      initialTouched={initialTouched}
      onSubmit={onSubmit}
    >
      <FormikForm noValidate>{children}</FormikForm>
    </Formik>
  )
}

SearchForm.displayName = 'SearchForm'

export default SearchForm
