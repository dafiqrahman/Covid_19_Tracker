$(document).ready(function () {
            var key = config.KEY_token;
            var host = config.host;
            var loading_anim = '<div class="text-center"> <div class="spinner-border" role="status"> </div> </div>'
            // default variabel 
            // country
            var country = "indonesia"
            console.log("ketiga" , country)  
            // ambil date hari ini
            date = new Date();
            var today = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2)
            $('.date').val(today)

            // menambahkan titik di angka
            var convert = function (angka) {
                if (angka == null) {
                    return "+ 0";
                } else {
                    var angka1 = angka.toLocaleString('id-ID', {
                        minimumFractionDigits: 0
                    })
                    return angka1
                }
            }

            // get input value
            $(".search").click(function () {
                var country = $('.input').val();
                
                // panggil API
                call_api(country, today)
                return country
            })
            $(".date").change(function () {
                var today = $('.date').val();
                // panggil API
                // country = $(".nama_negara").text()
                country = $( ".country").text().substring(9) 
                call_api(country, today)
            })

            // get data from API
            var call_api = function (country, date) {
                // console.log(date)
                const settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "https://covid-193.p.rapidapi.com/history?country=" + country + "&day=" +
                        date,
                    "method": "GET",
                    "headers": {
                        "x-rapidapi-host": host,
                        "x-rapidapi-key": key
                    },
                    beforeSend: function () {
                        //do something while load the data
                       $('.penambahan').addClass('loading')
                       $('.container_isi').html(loading_anim)
                    }

                };
                // console.log(settings["url"])
                $.ajax(settings)
                    .done(function (response) {
                        data = response["response"][0]
                        console.log(data)
                        if (data == null) {
                            alert("Data Tidak Ditemukan")
                            call_api("indonesia", today)
                        }else {
                            $('.loading').removeClass('loading')  
                            // nama negara
                            $(".country").text("Negara : " + data["country"])
                            // kasus aktif
                            $(".kasus_aktif").text(convert(data.cases.active))
                            // remove css class

                            $(".tambah_aktif").text(convert(data.cases.new))

                            // sembuh
                            $(".sembuh").text(convert(data.cases.recovered))
                            $(".sembuh_tambah").text(data.cases.recovered)

                            // kematian
                            $(".kematian").text(convert(data.deaths.total))
                            $(".kematian_tambah").text(convert(data.deaths.new))

                            // total kasus
                            $(".total_kasus").text(convert(data.cases.total))
                            $(".tests").text("Jumlah Test : " + convert(data.tests.total))

                            // last update
                            $(".date").val(data.day)
                            var country = data['country']
                            $(".input").val(country)           
                        } 
                    })
                    .fail(function (error) {
                        console.log("hello")
                    });
            }
            console.log("kedua" ,country)

            call_api(country, today)

        }) 