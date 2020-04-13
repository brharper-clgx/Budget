using Budget.Config;
using Budget.Models;
using Budget.Pages;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Threading.Tasks;
using Xamarin.Forms;

namespace Budget
{
    // Learn more about making custom code visible in the Xamarin.Forms previewer
    // by visiting https://aka.ms/xamarinforms-previewer
    [DesignTimeVisible(false)]
    public partial class MainPage : ContentPage
    {
        public MainPage()
        {
            InitializeComponent();
        }

        protected override async void OnAppearing()
        {
            base.OnAppearing();

            List<Payment> payments = await this.GetPaymentsOfCurrentMonth();

            listView.ItemsSource = payments;

            decimal dailyAverage = this.GetDailyAverage(payments);
            dailyAverageLabel.Text = this.ToCurrencyString(dailyAverage);
            monthlyTotal.Text = this.ToCurrencyString(payments.Select(p => p.Amount).Sum());
            amountSavedLabel.Text = this.ToCurrencyString(this.GetAmountSaved(dailyAverage));
        }

        async void OnPaymentAddedClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync
            (
                new PaymentEntryPage
                {
                    BindingContext = new Payment { Date = DateTime.UtcNow, },
                }
            );
        }

        async void OnSummariesClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync(new SummariesPage());
        }

        async void OnSettingsClicked(object sender, EventArgs e)
        {
            await Navigation.PushAsync
            (
                new UserSettingsPage
                {
                    BindingContext = new UserSettings { DailyAllocation = Settings.DailyAlloc, },
                }
            );
        }

        async void OnListViewItemSelected(object sender, SelectedItemChangedEventArgs e)
        {
            if (e.SelectedItem != null)
            {
                await Navigation.PushAsync(new PaymentEntryPage
                {
                    BindingContext = e.SelectedItem as Payment
                });
            }
        }

        private async Task<List<Payment>> GetPaymentsOfCurrentMonth()
        {
            DateTime now = DateTime.Now;
            return (await App.Database.GetPayments())
                   .Where(p => p.Date.Month == now.Month && p.Date.Year == now.Year)
                   .ToList();
        }

        private decimal GetDailyAverage(List<Payment> payments)
        {
            return payments.Select(p => p.Amount).Sum() / DateTime.Now.Day;
        }

        private decimal GetAmountSaved(decimal dailyAverage)
        {
            return (Settings.DailyAlloc - dailyAverage) * DateTime.Now.Day;
        }

        private string ToCurrencyString(decimal value)
        {
            return $"{value:C2}";
        }
    }
}
