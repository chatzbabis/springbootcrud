import constants from '@/components/constants'

export default {
  name: 'supplier',
  components: {},
  data: function () {
    return {
      visible: false,
      context: 'Supplier',
      supplier: initSupplier(),
      rules: {
        companyName: {
          required: true,
          max: constants.sizes.SIZE_M,
          trigger: 'blur'
        },
        firstName: {
          required: false,
          max: constants.sizes.SIZE_M,
          trigger: 'blur'
        },
        lastName: {
          required: false,
          max: constants.sizes.SIZE_M,
          trigger: 'blur'
        },
        address: {
          required: false,
          max: constants.sizes.SIZE_M,
          trigger: 'blur'
        },
        zipCode: {
          required: false,
          len: constants.sizes.SIZE_ZIP,
          trigger: 'blur'
        },
        city: {
          required: false,
          max: constants.sizes.SIZE_M,
          trigger: 'blur'
        },
        country: {
          required: false,
          max: constants.sizes.SIZE_M,
          trigger: 'blur'
        },
        vatNumber: {
          required: true,
          len: constants.sizes.SIZE_VAT,
          trigger: 'blur'
        },
        irsOffice: {
          required: false,
          max: constants.sizes.SIZE_M,
          trigger: 'blur'
        }
      }
    }
  },
  created () {
    console.log('Supplier created')
  },
  mounted () {
    this.$events.$on('edit-supplier', eventData => this.onEditSupplier(eventData))
    console.log('Supplier mounted')
  },
  destroyed: function () {
    this.$events.$off('edit-supplier')
    console.log('Supplier destroyed')
  },
  computed: {
    isDeletable: function () {
      return this.supplier.id != null
    }
  },
  methods: {
    onEditSupplier (eventData) {
      if (eventData != null) {
        this.$http.get('suppliers/' + eventData.id)
          .then(response => {
            this.supplier = response.data
            this.visible = true
            this.clearValidation()
          })
      } else {
        Object.assign(this.$data.supplier, initSupplier())
        this.visible = true
        this.clearValidation()
      }
    },
    save () {
      this.$refs['supplierForm'].validate().then(() => {
        let _self = this
        if (this.supplier.id != null) {
          // existing supplier, update
          this.$http.patch('suppliers/' + this.supplier.id, this.supplier, {
            // transform the selected roles into URIs, before sending
            transformRequest: [function (data, headers) {
              return _self.transformRequest(data)
            }]
          }).then(response => {
            this.handleSuccessUpdate(response)
          }).catch(e => this.handleError(e))
        } else {
          // new supplier, create
          this.$http.post('suppliers', this.supplier, {
            // transform the selected roles into URIs, before sending
            transformRequest: [function (data, headers) {
              return _self.transformRequest(data)
            }]
          }).then(response => this.handleSuccessCreate(response))
            .catch(e => this.handleError(e))
        }
      }).catch(e => {
        console.error('validation FAILED')
      })
    },
    cancel () {
      this.visible = false
      this.clearValidation()
    },
    handleSuccessUpdate (response) {
      this.visible = false
      this.successFloat(this.$messages.successActionUpdatedSupplier)
      console.log('fire supplier-edited event')
      this.$events.fire('supplier-edited', this.supplier)
    },
    handleSuccessCreate (response) {
      this.visible = false
      this.successFloat(this.$messages.successActionCreatedSupplier)
      console.log('fire supplier-edited event')
      this.$events.fire('supplier-edited', this.supplier)
    },
    handleSuccessDeleted (response) {
      this.visible = false
      this.successFloat(this.$messages.successActionCreatedSupplier)
      console.log('fire supplier-edited event')
      this.$events.fire('supplier-edited', this.supplier)
    },

    handleError (e) {
      this.showDefaultError(e)
    },
    confirmDelete () {
      this.$confirm(this.$messages.confirmAction, this.$messages.confirmActionTitleSupplier, {
        confirmButtonText: this.$messages.yes,
        cancelButtonText: this.$messages.no,
        cancelButtonClass: 'btn btn-warning',
        confirmButtonClass: 'btn btn-danger',
        closeOnClickModal: false,
        closeOnPressEscape: false,
        type: 'warning'
      }).then(() => {
        // delete supplier
        this.$http.delete('suppliers/' + this.supplier.id).then(response => this.handleSuccessDeleted(response))
      })
    },
    transformRequest (data) {
      if (data.firstName === '') {
        delete data.firstName
      }
      if (data.lastName === '') {
        delete data.lastName
      }
      if (data.irsOffice === '') {
        delete data.irsOffice
      }
      if (data.zipCode === '') {
        delete data.zipCode
      }
      if (data.city === '') {
        delete data.city
      }
      if (data.country === '') {
        delete data.country
      }
      return JSON.stringify(data)
    },
    clearValidation () {
      if (this.$refs['supplierForm']) {
        this.$refs['supplierForm'].clearValidate()
      }
    }
  }
}

/**
 * Create a new totally empty Supplier
 * @returns {{id: null, companyName: string, firstName: string,
  lastName: string, address: string, vatNumber: string,
  city: string, country: string, zipCode: string, irsOffice: string}}
 */
function initSupplier () {
  return {
    id: null,
    companyName: '',
    firstName: '',
    lastName: '',
    address: '',
    vatNumber: '',
    city: '',
    country: '',
    zipCode: '',
    irsOffice: '',
  }
}
