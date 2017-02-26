(() => {
  class ApiConstants {

    get authentication() {
      return {
        login:
        {
          student: '/students/sign_in',
          teacher: '/teachers/sign_in',
          admin: '/admins/sign_in',
        },
        logout:
        {
          student: '/students/sign_out',
          teacher: '/teachers/sign_out',
          admin: '/admins/sign_out',
        },
        signup:
        {
          student: '/students',
          teacher: '/teachers',
        },
        request_reset_password:
        {
          student: '/passwords/students/reset_request',
          teacher: '/passwords/teachers/reset_request',
          admin: '/passwords/admins/reset_request',
        },
        change_password:
        {
          student: 'passwords/students/reset_password',
          teacher: 'passwords/teachers/reset_password',
          admin: 'passwords/admins/reset_password',
        }
      }
    }

    get students() {
      return {
        index: '/api/students',
        unmatched: '/api/students/unmatched',
        delete: (id) => `/api/students/${id}`,
        update: (id) => `/api/students/${id}`,
        show: (id) => `/api/students/${id}`,
        upcomingLessons: (id) => `/api/students/upcoming_lessons/${id}`,
        recentLessons: (id) => `/api/students/recent_lessons/${id}`,
        instruments: (id) => `/api/students/${id}/instruments`,
      };
    }

    get teachers() {
      return {
        index: '/api/teachers',
        delete: (id) => `/api/teachers/${id}`,
        update: (id) => `/api/teachers/${id}`,
        show: (id) => `/api/teachers/${id}`,
        possibleTeachers: (id, instrument) => `/api/teachers/possible_teachers?id=${id}&instrument=${instrument}`,
        upcomingLessons: (id) => `/api/teachers/upcoming_lessons/${id}`,
        recentLessons: (id) => `/api/teachers/recent_lessons/${id}`,
      };
    }

    get searchables() {
      return {
        users: (prefix, filter) => `/api/searchables/users?prefix=${prefix}&filter=${filter}`,
        roster: '/api/searchables/roster',
      }
    }

    get lessons() {
      return {
        create: '/api/lessons',
        index: '/api/lessons',
        delete: (id) => `/api/lessons/${id}`,
        update: (id) => `/api/lessons/${id}`,
        show: (id) => `/api/lessons/${id}`,
      };
    }

    get matchings() {
      return {
        create: '/api/matchings',
        index: '/api/matchings',
        delete: (id) => `/api/matchings/${id}`,
        update: (id) => `/api/matchings/${id}`,
        show: (id) => `/api/matchings/${id}`,
      };
    }

    get stripe() {
      return {
        createCustomer: '/stripe/customer',
        createAccount: '/stripe/account',
        verifyAccount: '/stripe/verify_account',
        charge: '/stripe/charge',
      }
    }

    get instruments() {
      return {
        create: '/api/instruments',
        delete: (id) => `/api/instruments/${id}`,
      }
    }
  }
  this.ApiConstants = new ApiConstants();
})();
