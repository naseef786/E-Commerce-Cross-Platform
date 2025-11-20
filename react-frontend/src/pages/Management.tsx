import { useGetProductsQuery, useAddProductMutation, useDeleteProductMutation } from "../features/productApi";
import ProtectedRoute from "../components/ProtectedRoute";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function Manage() {
  const { data: products = [] } = useGetProductsQuery();
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  // Form validation schema
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required")
      .positive("Price must be greater than 0"),
  });

  return (
    <ProtectedRoute requireAdmin>
      <h2>Manage Products</h2>

      <Formik
        initialValues={{ name: "", description: "", price: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          await addProduct({ 
            name: values.name, 
            description: values.description, 
            price: Number(values.price) 
          });
          resetForm();
        }}
      >
        {({ isSubmitting }) => (
          <Form style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}>
            <div>
              <Field name="name" placeholder="Name" />
              <div style={{ color: "red", fontSize: "12px" }}>
                <ErrorMessage name="name" />
              </div>
            </div>

            <div>
              <Field name="description" placeholder="Description" />
              <div style={{ color: "red", fontSize: "12px" }}>
                <ErrorMessage name="description" />
              </div>
            </div>

            <div>
              <Field name="price" placeholder="Price" type="text" />
              <div style={{ color: "red", fontSize: "12px" }}>
                <ErrorMessage name="price" />
              </div>
            </div>

            <button type="submit" disabled={isSubmitting}>Add</button>
          </Form>
        )}
      </Formik>

      <div style={{ marginTop: "20px" }}>
        {products.map(p => (
          <div key={p._id} style={{ marginBottom: "10px" }}>
            {p.name}{" "}
            <button onClick={() => deleteProduct(p._id)}>Delete</button>
          </div>
        ))}
      </div>
    </ProtectedRoute>
  );
}
