var calendar=function(){
	var d = new Date();
	const monthNames = ["January", "February", "March", "April", "May", "June",  "July", "August", "September", "October", "November", "December"];
	function lode_page(){
				$('.event').hide();
				$('#data_chooser').html((monthNames[d.getMonth()])+" , "+d.getFullYear());
				generateCalendar();
					$('#arrow_right').click(right);
					$('#arrow_left').click(left);
					$('#Today').click(today);
					$('#ok').click( function(){$('.event').hide();});
			}
			function left(){
					updateDate(0);
					$('#data_chooser').html((monthNames[d.getMonth()])+" , "+d.getFullYear());
					generateCalendar();
					return false;
			}
			function right(){				
					updateDate(1);
					$('#data_chooser').html((monthNames[d.getMonth()])+" , "+d.getFullYear());
					generateCalendar();
					return false;
			}
			function updateDate(sign) {
				var m = d.getMonth();
				if(sign) {
					if(m+1>11) {
						d.setFullYear(d.getFullYear()+1);
						d.setMonth(0);
					} 
					else {
						d.setMonth(m+1);
					}
				} 
				else {
					if(m-1<0) {
						d.setFullYear(d.getFullYear()-1);
						d.setMonth(11);
					} 
					else {
						d.setMonth(m-1);
					}
				}
			}
	function today(){
		var td = new Date();
		d.setMonth( td.getMonth());
		d.setYear(td.getFullYear());
		$('#data_chooser').html((monthNames[d.getMonth()])+" , "+d.getFullYear());
		generateCalendar();
	}
	function generateCalendar() {
				var days = howManyDays();
				var shift = getDayFirstDate();
				clear();
				for(var i=0; i<days;i++) {
					var posi_row = Math.floor((i+shift)/7);
					var posi_col = Math.floor((i+shift)%7);
					$('#calendar_display .r'+posi_row).children('.col'+posi_col).html(i+1);
					$('#calendar_display .r'+posi_row).children('.col'+posi_col).click( addEvent);
					var new_d=new Date();
					if((new_d.getMonth()==d.getMonth())&&(new_d.getFullYear()==d.getFullYear())&&(new_d.getDate()-1==i))
						$('#calendar_display .r'+posi_row).children('.col'+posi_col).css("background-color", "aqua");
					}
					if(shift>0)
					{
						updateDate(0);
						var last_day= howManyDays();
						updateDate(1);
						var i,j;
						for(i=shift-1,j=0;i>=0&&j<=shift;i--,j++)
						{
							$('#calendar_display .r0').children('.col'+i).html(last_day-j);
							$('#calendar_display .r0').children('.col'+i).css("color","#BBBBBB");
							 //$('#calendar_display .r0').children('.col'+i).unbind("click"); 
						}
					}
					updateDate(1);
				var first_day=getDayFirstDate();
				updateDate(0);
				if((first_day<=6)&&(first_day!=0))
				{
					var i=0;j;
					
					if((days==30&&shift==6)||(days==31&&(shift==5||shift==6)))
					for(i=first_day,j=1;i<=6;i++,j++)
					{
						$('#calendar_display .r5').children('.col'+i).html(j);
						$('#calendar_display .r5').children('.col'+i).css("color","#BBBBBB");
						
					}
					else
					for(i=first_day,j=1;i<=6;i++,j++)
					{
						$('#calendar_display .r4').children('.col'+i).html(j);
						//$('#calendar_display .r4').children('.col'+i).css("color","#BBBBBB");
						
					}
				}
				
			}
	function clear()
		{
			$('#calendar_display tbody td').each(function(){
			$(this).html('');
			$(this).css("color", "black");	
			$(this).css("background-color", "white");
			})
		}
	function getDayFirstDate() {
				var tempd = new Date();
				tempd.setFullYear(d.getFullYear());
				tempd.setMonth(d.getMonth());
				tempd.setDate(1);
				tempd.setHours(0);
				tempd.setMinutes(0);
				tempd.setSeconds(0);
				return tempd.getDay();
			}
	function howManyDays() {
				var m = d.getMonth()+1 ;
				if(m==1||m==3||m==5||m==7||m==8||m==10||m==12) return 31;
				if(m==2) {
					if(isLeapYear(d.getFullYear())) {
						return 29
					} else {
						return 28
					}
				}
				return 30;
			}
	function isLeapYear(year) {
				if(year%400==0) {
					return true;
				}
				else if(year%100==0) {
					return false;
				}
				else if(year%4==0) {
					return true;
				} 
				else {
					return false;
				}
			}
	 function addEvent()
 {
	 $("#time1").val("");
	 $("#time2").val("");
	 $("#desc").val("");
	 var date=$("#calendar_container")[0].innerHTML;
	 $('#newEvent').html("New Event at "+this.innerHTML+" "+date );
	 $('.event').show();
	 
 }
	return{ lode_page : lode_page};
}();
$("document").ready(function() {calendar.lode_page() });

					
					