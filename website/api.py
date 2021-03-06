from website.models import Restaurant
import re

def export_data():
    restaurants = list()
    
    # Sort the restaurants by alphabetical order ignoring "the" and "a"
    alphalist = sorted(Restaurant.objects.all(),
            key=lambda r: re.sub('^(the|a) ', '', r.name, count=1,
            flags=re.IGNORECASE))
    
    for restaurant in alphalist:
        restaurant_data = {
            'name': restaurant.name,
            'location': restaurant.location, 
            'id': restaurant.id
        }
        open_times = list()
        # Sort open times by their start day and time
        sorted_times = sorted(restaurant.main_schedule.open_times.all(),
                key=lambda t: (t.start_day, t.start_time, t.end_time))
        for time in sorted_times:
            open_times.append({
                    'start_day': time.start_day,
                    'start_time': time.start_time.isoformat(),
                    'end_day': time.end_day,
                    'end_time': time.end_time.isoformat()
            })
        restaurant_data['main_schedule'] = {
                'name': restaurant.main_schedule.name,
                'open_times': open_times
        }
        special_schedules = list()
        for schedule in restaurant.special_schedules.all():
            open_times = list()
            sorted_times = sorted(schedule.open_times.all(),
                key=lambda t: (t.start_day, t.start_time, t.end_time))
            for time in sorted_times:
                open_times.append({
                        'start_day': time.start_day,
                        'start_time': time.start_time.isoformat(),
                        'end_day': time.end_day,
                        'end_time': time.end_time.isoformat()
                })
            special_schedules.append({
                    'name': schedule.name,
                    'start': schedule.valid_start.isoformat(),
                    'end': schedule.valid_end.isoformat(),
                    'open_times': open_times
            })
        restaurant_data['special_schedules'] = special_schedules
        restaurants.append(restaurant_data)
    return restaurants
