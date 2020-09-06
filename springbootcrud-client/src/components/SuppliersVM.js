import Person from '@/components/Person'

export default {
  components: {
    Person
  },
  created () {
    this.refreshSuppliers()
    console.log('Suppliers created')
  },
  mounted () {
    // subscribe to the 'row-selected' event (wherever it may come from, should come from the child table component)
    this.$events.$on('row-selected', eventData => this.onSupplierSelected(eventData))
    this.$events.$on('supplier-edited', eventData => this.onSupplierEdited(eventData))
    console.log('Suppliers mounted')
  },
  beforeDestroy () {
    // un-subscribe from events
    this.$events.$off('row-selected')
    this.$events.$off('supplier-edited')
  },
  destroyed () {
    console.log('Suppliers destroyed')
  },
  data: function () {
    return {
      url: 'suppliers/search/findByQuery?query=',
      query: '',
      suppliers: [],
      fields: [
        {
          name: 'id',
          title: 'Α/Α',
          sortField: 'id'
        },
        {
          name: 'companyName',
          title: 'Όνομα εταιρείας',
          sortField: 'companyName'
        },
        {
          name: 'firstName',
          title: 'Όνομα',
          sortField: 'firstName'
        },
        {
          name: 'lastName',
          title: 'Επίθετο',
          sortField: 'lastName'
        },
        {
          name: 'address',
          title: 'Διεύθυνση',
          sortField: 'address'
        },
        {
          name: 'zipCode',
          title: 'τκ',
          sortField: 'zipCode'
        },
        {
          name: 'city',
          title: 'Πόλη',
          sortField: 'city'
        },
        {
          name: 'country',
          title: 'Χώρα',
          sortField: 'country'
        },
        {
          name: 'vatNumber',
          title: 'ΑΦΜ',
          sortField: 'vatNumber'
        },
        {
          name: 'irsOffice',
          title: 'ΔΟΥ',
          sortField: 'irsOffice'
        }

      ]
    }
  },
  watched: {
    query: function (newValue) {
      this.query = newValue
      console.log(newValue)
      this.refreshSuppliers()
    }
  },
  methods: {
    createSupplier (event) {
      console.log('fire edit-supplier event')
      this.$events.fire('edit-supplier', null)
    },
    onSupplierSelected (dataItem) {
      console.log('fire edit-supplier event')
      this.$events.fire('edit-supplier', dataItem)
    },
    onSupplierEdited (dataItem) {
      this.refreshSuppliers()
    },
    refreshSuppliers () {
      this.$http.get(this.url + this.query)
        .then(response => {
          this.suppliers = response.data._embedded.suppliers
        })
        .catch(e => {
          console.log('error: ')
          console.log(e)
        })
    }
  }
}
