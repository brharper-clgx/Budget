using System;
using Xamarin.Forms;
using Budget.Models;
using System.Text.RegularExpressions;

namespace Budget
{
    public partial class PaymentEntryPage : ContentPage
    {
        public PaymentEntryPage()
        {
            InitializeComponent();
        }

        async void OnSaveButtonClicked(object sender, EventArgs e)
        {
            Payment payment = BindingContext as Payment;
            await App.Database.SavePaymentAsync(payment);
            await Navigation.PopAsync();
        }

        async void OnDeleteButtonClicked(object sender, EventArgs e)
        {
            Payment payment = BindingContext as Payment;
            await App.Database.DeletePaymentAsync(payment);
            await Navigation.PopAsync();
        }
    }
}