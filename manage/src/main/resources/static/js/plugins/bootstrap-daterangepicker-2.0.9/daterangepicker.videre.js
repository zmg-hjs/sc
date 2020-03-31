$(document).ready(function()
{
    videre.enableLogging = true;

    if (window.videre == null)
        alert('videre.js is missing');

    videre.UI.registerControlType('bootstrap-daterangepicker',
    {
        get: function(ctl)
        {
            //var picker = ctl.data('daterangepicker');
            var val = null;
            if (ctl.data('startdate') != null)
            {
                val = ctl.data('startdate').toISOString() + " - " + ctl.data('enddate').toISOString();
            }
            return val;

            //return ctl.val();
        },
        set: function(ctl, val)
        {
            var picker = ctl.data('daterangepicker');
            var start = null;
            var end = null;
            if (!String.isNullOrEmpty(val))
            {
                var dates = val.split(' - ');
                start = moment(dates[0]);
                end = moment(dates[1]);

                picker.setStartDate(start);
                picker.setEndDate(moment(end));
                picker.callback(start, end);    //call back?
            }
            else
            {
                ctl.val('');
                picker.callback(start, end);
            }

            //ctl.find('.daterange-text').html(start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));    //todo:  how to call refresh
        },
        init: function(ctr)
        {
            ctr.find('[data-controltype=\"bootstrap-daterangepicker\"]').each(function(idx, ctl)
            {
                ctl = $(ctl);

                //var startDate = this._startDate == null ? moment().subtract('days', 29) : moment(this._startDate);
                //var endDate = this._endDate == null ? moment() : moment(this._endDate);

                ctl.daterangepicker(
                    {
                        //opens: 'left',
                        ranges: {
                            'Today': [moment(), moment()],
                            'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
                            'Last 7 Days': [moment().subtract('days', 6), moment()],
                            'Last 30 Days': [moment().subtract('days', 29), moment()],
                            'This Month': [moment().startOf('month'), moment().endOf('month')],
                            'Last Month': [moment().subtract('month', 1).startOf('month'), moment().subtract('month', 1).endOf('month')],
                            'This Year': [moment().startOf('year'), moment().endOf('year').endOf('month')],
                            'Last Year': [moment().subtract('year', 1).startOf('year'), moment().subtract('year', 1).endOf('year').endOf('month')]
                        },
                        //startDate: startDate,
                        //endDate: endDate,
                        locale: { cancelLabel: 'Clear' }
                    }, onDateRangePicked);
                //onDateRangePicked(startDate, endDate, null, true);

                ctl.removeClass('navbar-right');

                var picker = ctl.data('daterangepicker');
                var textCtl = ctl.find('.daterange-text');

                //ctl.off('click.daterangepicker');
                //textCtl.click(function(e)
                //{
                //    e.preventDefault()
                //    return false;
                //});   //don't bubble up so toggle doesn't happen
                //textCtl.focus(function(e)
                //{
                //    if (picker.isShowing == false)
                //        picker.show();
                //});
                //textCtl.blur(function(e)
                //{
                //    //only if it is not our control
                //    setTimeout(function()
                //    {
                //        var target = $(document.activeElement);
                //        if (
                //            // ie modal dialog fix
                //            //e.type == "focusin" ||
                //            target.closest(ctl).length ||
                //            //target.closest(this.container).length ||
                //            target.closest('.calendar-table').length
                //            ) return;
                //        picker.hide();
                //    }, 100);
                //});

                if (textCtl.prop('tagName').toLowerCase() == 'input')
                {
                    textCtl.keypress(function(e)
                    {
                        e.preventDefault();
                    });
                    textCtl.keydown(function(e)
                    {
                        if (e.keyCode == 8 || e.keyCode == 46)  //backspace or delete
                        {
                            ctl.val('');
                            picker.callback(null, null);
                            picker.element.trigger('apply.daterangepicker', picker);
                            e.preventDefault();
                        }
                        if (e.keyCode == 123)   //F12
                        {
                            if (e.altKey)
                            {
                                var d = moment();
                                picker.setStartDate(d);
                                picker.setEndDate(d);
                                picker.callback(d, d);
                                picker.hide();
                            }
                            else
                                picker.toggle();

                            e.preventDefault();
                        }
                    });
                }


                ctl.on('cancel.daterangepicker', function(e, picker)
                {
                    ctl.val('');
                    picker.callback(null, null);
                });

                function onDateRangePicked(start, end, selection, noRefresh)
                {
                    ctl.data('startdate', start);
                    ctl.data('enddate', end);

                    //var textCtl = ctl.find('.daterange-text');

                    var val = '';
                    if (start != null)
                        val = start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY');

                    if (textCtl.prop('tagName').toLowerCase() == 'input')
                    {
                        textCtl.val(val);
                        if (!textCtl.is(':focus'))
                            textCtl.focus();
                    }
                    else
                        ctl.html(val);

                        //ctl.find('.daterange-text').html(start.format('MMM D, YYYY') + ' - ' + end.format('MMM D, YYYY'));
                    //else 
                    //    ctl.find('.daterange-text').html('');
                }

            });

        }
    });
});
