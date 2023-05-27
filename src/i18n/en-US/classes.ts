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
      columns: 'Columns',

      input: {
        // TODO rmeove
        rowsLabel: 'Rows',
        // TODO remove
        columnsLabel: 'Columns',

        nameLabel: 'Name',
        seatCountLabel: 'Seat count for column {colNo}',
      },
    },

    createClassSubmitPrompt: {
      title: 'Create Class',
      message: 'Please confirm that the details are correct before submitting.',
      columnCount: '{count} column | {count} columns',
      seatCount: '{count} seat | {count} seats',
      input: {
        nameLabel: 'Name',
      },
    },

    editSeatPlan: {
      title: 'Edit seat plan',
    },
  },

  addStudents: 'Add students',
  emptyStudents: 'No students to show',

  studentList: 'Students',

  notifs: {
    studentDeleteSuccess: 'Student {name} has been removed',
  },
}
