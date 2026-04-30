import { useFormik } from "formik";
import { useSelector } from "react-redux";
import * as Yup from "yup";

const countries = ["India", "USA", "UK", "Canada", "Australia", "Germany"];
const genders = ["Male", "Female", "Other"];

const ErrorMessage = ({ formik, name }) => {
  const message = formik.touched[name] && formik.errors[name];

  return message ? (
    <p className="mt-1 text-sm text-red-400">{message}</p>
  ) : null;
};

const fieldClass = (formik, name) =>
  `w-full rounded-lg border bg-gray-900 px-4 py-3 text-white placeholder:text-gray-500 outline-none transition-colors ${
    formik.touched[name] && formik.errors[name]
      ? "border-red-500 focus:border-red-400"
      : "border-gray-700 focus:border-indigo-500"
  }`;

const PaymentForm = () => {
  const cart = useSelector((store) => store.cartStore.cart);
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      gender: "",
      country: "",
      terms: false,
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
    validateOnMount: true,
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .required("Full Name is required"),
      email: Yup.string()
        .trim()
        .email("Invalid email address")
        .required("Email is required"),
      phone: Yup.string()
        .matches(/^[0-9]+$/, "Phone must be numbers only")
        .min(10, "Phone must be at least 10 digits")
        .max(15, "Phone must be at most 15 digits")
        .required("Phone Number is required"),
      address: Yup.string()
        .trim()
        .min(5, "Address must be at least 5 characters")
        .required("Address is required"),
      gender: Yup.string().required("Please select a gender"),
      country: Yup.string().required("Please select a country"),
      terms: Yup.boolean().oneOf(
        [true],
        "You must accept the Terms & Conditions",
      ),
      cardNumber: Yup.string()
        .matches(/^[0-9]{16}$/, "Card Number must be exactly 16 digits")
        .required("Card Number is required"),
      expiryDate: Yup.string()
        .matches(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Expiry must be MM/YY format")
        .required("Expiry Date is required"),
      cvv: Yup.string()
        .matches(/^[0-9]{3}$/, "CVV must be exactly 3 digits")
        .required("CVV is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      alert("Payment Successful!\n" + JSON.stringify(values, null, 2));
      resetForm();
    },
  });

  const isPayDisabled = !formik.isValid || formik.isSubmitting;

  return (
    <div className="container mx-auto px-6 py-8">
      <h2 className="mb-8 text-3xl font-bold text-white">Payment Form</h2>

      <div className="flex flex-col gap-8 lg:flex-row">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full rounded-xl border border-gray-700 bg-gray-800 p-6 lg:w-2/3"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-300"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                placeholder="Enter your full name"
                className={fieldClass(formik, "fullName")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.fullName}
              />
              <ErrorMessage formik={formik} name="fullName" />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-300"
                htmlFor="email"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                className={fieldClass(formik, "email")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
              />
              <ErrorMessage formik={formik} name="email" />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-300"
                htmlFor="phone"
              >
                Phone Number
              </label>
              <input
                id="phone"
                name="phone"
                type="text"
                placeholder="1234567890"
                className={fieldClass(formik, "phone")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
              />
              <ErrorMessage formik={formik} name="phone" />
            </div>

            <div>
              <label
                className="mb-2 block text-sm font-medium text-gray-300"
                htmlFor="country"
              >
                Country
              </label>
              <select
                id="country"
                name="country"
                className={fieldClass(formik, "country")}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
              >
                <option value="">Select Country</option>
                {countries.map((country) => (
                  <option key={country} value={country}>
                    {country}
                  </option>
                ))}
              </select>
              <ErrorMessage formik={formik} name="country" />
            </div>

            <div className="md:col-span-2">
              <label
                className="mb-2 block text-sm font-medium text-gray-300"
                htmlFor="address"
              >
                Address
              </label>
              <textarea
                id="address"
                name="address"
                placeholder="Enter your full address"
                className={`${fieldClass(formik, "address")} min-h-28 resize-y`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
              />
              <ErrorMessage formik={formik} name="address" />
            </div>
          </div>

          <div className="mt-6 border-t border-gray-700 pt-6">
            <p className="mb-3 text-sm font-medium text-gray-300">Gender</p>
            <div className="flex flex-wrap gap-3">
              {genders.map((gender) => (
                <label
                  key={gender}
                  className={`flex cursor-pointer items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${
                    formik.values.gender === gender
                      ? "border-indigo-500 bg-indigo-500/10 text-white"
                      : "border-gray-700 bg-gray-900 text-gray-300 hover:border-gray-600"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value={gender}
                    className="accent-indigo-500"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    checked={formik.values.gender === gender}
                  />
                  {gender}
                </label>
              ))}
            </div>
            <ErrorMessage formik={formik} name="gender" />
          </div>

          <div className="mt-6 rounded-xl border border-gray-700 bg-gray-900/60 p-5">
            <h3 className="mb-5 text-xl font-bold text-white">Card Details</h3>
            54322
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <div className="md:col-span-2">
                <label
                  className="mb-2 block text-sm font-medium text-gray-300"
                  htmlFor="cardNumber"
                >
                  Card Number
                </label>
                <input
                  id="cardNumber"
                  name="cardNumber"
                  type="text"
                  inputMode="numeric"
                  placeholder="1234567890123456"
                  maxLength="16"
                  className={fieldClass(formik, "cardNumber")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cardNumber}
                />
                <ErrorMessage formik={formik} name="cardNumber" />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-300"
                  htmlFor="expiryDate"
                >
                  Expiry Date
                </label>
                <input
                  id="expiryDate"
                  name="expiryDate"
                  type="text"
                  placeholder="MM/YY"
                  maxLength="5"
                  className={fieldClass(formik, "expiryDate")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.expiryDate}
                />
                <ErrorMessage formik={formik} name="expiryDate" />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-gray-300"
                  htmlFor="cvv"
                >
                  CVV
                </label>
                <input
                  id="cvv"
                  name="cvv"
                  type="password"
                  inputMode="numeric"
                  placeholder="123"
                  maxLength="3"
                  className={fieldClass(formik, "cvv")}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.cvv}
                />
                <ErrorMessage formik={formik} name="cvv" />
              </div>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex cursor-pointer items-start gap-3 text-sm text-gray-300">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="mt-1 accent-indigo-500"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                checked={formik.values.terms}
              />
              <span>I accept the Terms & Conditions</span>
            </label>
            <ErrorMessage formik={formik} name="terms" />
          </div>

          <button
            type="submit"
            disabled={isPayDisabled}
            className={`mt-8 w-full rounded-lg px-4 py-3 font-bold text-white transition-colors ${
              isPayDisabled
                ? "cursor-not-allowed bg-gray-600 text-gray-300"
                : "bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700"
            }`}
          >
            Pay ${total.toFixed(2)}
          </button>
        </form>

        <aside className="w-full lg:w-1/3">
          <div className="sticky top-24 rounded-xl border border-gray-700 bg-gray-800 p-6">
            <h3 className="mb-6 text-xl font-bold text-white">Order Summary</h3>

            <div className="mb-6 space-y-3 border-b border-gray-700 pb-6 text-gray-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Estimated Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-3 text-lg font-bold text-white">
                <span>Total</span>
                <span className="text-indigo-400">${total.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-sm leading-6 text-gray-400">
              Your payment details must be correct.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PaymentForm;
