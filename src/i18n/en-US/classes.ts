export default {
  dialogs: {
    addStudents: {
      input: {
        firstNameLabel: 'First name',
        lastNameLabel: 'Last name',
      },

      emptyMessage: 'No students added yet',

      title: 'Add Students',
    },

    deleteStudentPrompt: {
      title: 'Remove student',
      message: 'Are you sure you want to remove {name} from the student list?',
      okLabel: "Yes, I'm sure",
    },

    createClass: {
      title: 'Create Class',
      input: {
        rowsLabel: 'Rows',
        columnsLabel: 'Columns',
        nameLabel: 'Name',
      },
    },
  },

  addStudents: 'Add students',
  emptyStudents: 'No students to show',

  studentList: 'Students',

  notifs: {
    studentDeleteSuccess: 'Student {name} has been removed',
  },
}
